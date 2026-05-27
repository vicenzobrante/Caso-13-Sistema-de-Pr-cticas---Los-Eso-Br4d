# Sistema de Prácticas — Arquitectura de Microservicios

## Índice

1. [Visión general](#visión-general)
2. [Microservicios](#microservicios)
3. [Cómo levantar el sistema](#cómo-levantar-el-sistema)
4. [Decisiones arquitectónicas](#decisiones-arquitectónicas)
5. [Diagrama de clases y relaciones](#diagrama-de-clases-y-relaciones)

---

## Visión general

El sistema de prácticas está dividido en **5 microservicios independientes** más un **gateway GraphQL** que actúa como punto de entrada único para el frontend. Cada microservicio tiene su propia base de datos MongoDB, su propio servidor Express y se despliega de forma independiente.

```
Frontend / Cliente
       │
       ▼
 ┌─────────────┐
 │   Gateway   │  Puerto 4000 — GraphQL unificado
 │  (Apollo)   │
 └──────┬──────┘
        │ HTTP REST
   ┌────┴──────────────────────────────────────┐
   │                                           │
   ▼           ▼           ▼           ▼       ▼
ms-usuarios  ms-practicas  ms-evaluaciones  ms-documentos  ms-notificaciones
  :4001         :4002           :4003           :4004           :4005
   │              │               │               │               │
  MongoDB       MongoDB         MongoDB         MongoDB         MongoDB
(ms_usuarios) (ms_practicas) (ms_evaluaciones) (ms_documentos) (ms_notificaciones)
```

---

## Microservicios

| Servicio | Puerto | Responsabilidad | Modelos |
|---|---|---|---|
| `ms-usuarios` | 4001 | Usuarios, roles y estructura académica | Usuario, Alumno, Docente, CoordinadorCarrera, JefeCarrera, Empleador, Carrera, Sede |
| `ms-practicas` | 4002 | Proceso de práctica y empresas | Practica, CentroPractica |
| `ms-evaluaciones` | 4003 | Formularios, actas y evaluaciones | Formulario, Acta1, Acta2, EvaluacionInformePractica, ActaFinal |
| `ms-documentos` | 4004 | Archivos, informes y material de apoyo | Documento, InformePractica, DocumentoApoyo |
| `ms-notificaciones` | 4005 | Mensajes y alertas a usuarios | Notificacion |
| `gateway` | 4000 | Coordinación y API GraphQL única | — |

---

## Cómo levantar el sistema

Cada microservicio se levanta por separado. Asegurarse de tener MongoDB corriendo primero.

```bash
# Instalar dependencias en cada servicio
cd gateway && npm install
cd ../ms-usuarios && npm install
cd ../ms-practicas && npm install
cd ../ms-evaluaciones && npm install
cd ../ms-documentos && npm install
cd ../ms-notificaciones && npm install

# Levantar cada uno en una terminal distinta
cd ms-usuarios && npm run dev
cd ms-practicas && npm run dev
cd ms-evaluaciones && npm run dev
cd ms-documentos && npm run dev
cd ms-notificaciones && npm run dev
cd gateway && npm run dev
```

La API GraphQL queda disponible en `http://localhost:4000/graphql`.

---

## Decisiones arquitectónicas

### Decisión 1: División en microservicios

**Alternativa A — Monolito único con GraphQL**
Mantener todo en un solo servidor Express con Apollo Server, como estaba originalmente. Un único proceso, una base de datos, todos los modelos juntos.

**Descarte de A:**
Se descarta porque mezcla dominios que cambian por razones distintas. La lógica de evaluaciones (criterios, notas ponderadas) puede evolucionar cada semestre sin que eso afecte a la gestión de usuarios o documentos. Con un monolito, cualquier cambio requiere redesplegar todo el sistema y aumenta el riesgo de introducir bugs en partes no relacionadas.

**Alternativa B — Microservicios por entidad (un servicio por modelo)**
Crear un microservicio separado para cada modelo: uno para Alumno, otro para Docente, otro para Practica, etc.

**Descarte de B:**
Se descarta porque genera un acoplamiento excesivo entre servicios que naturalmente pertenecen al mismo dominio. Por ejemplo, Acta1, Acta2, ActaFinal y EvaluacionInformePractica siempre se consultan juntas dentro del proceso de evaluación. Separarlas en microservicios distintos implicaría múltiples llamadas HTTP para completar una operación simple, incrementando la latencia y la complejidad sin beneficio real.

**Alternativa C — Microservicios por dominio funcional (seleccionada)**
Agrupar los modelos según el dominio de negocio al que pertenecen.

**Selección:**
Se selecciona la alternativa C.

**Justificación:**
Cada microservicio agrupa entidades que tienen alta cohesión entre sí y que cambian por las mismas razones. Usuarios, carreras y sedes forman parte del dominio de identidad. Las prácticas y centros de práctica pertenecen al proceso operacional. Las actas y formularios son parte del proceso de evaluación. Los documentos e informes comparten lógica de almacenamiento. Esta división reduce el acoplamiento entre servicios, permite escalar de forma independiente (por ejemplo, ms-evaluaciones durante el cierre de semestre) y facilita que distintos equipos trabajen en paralelo.

---

### Decisión 2: Gateway GraphQL como punto de entrada único

**Alternativa A — Exponer cada microservicio directamente al frontend**
El cliente llama directamente a los puertos 4001-4005 según lo que necesite.

**Descarte de A:**
Se descarta porque el frontend necesitaría conocer la ubicación de cada microservicio y coordinar múltiples peticiones para armar datos relacionados (por ejemplo, una práctica con su alumno, su docente y su informe). Esto viola el principio de bajo acoplamiento y complica enormemente el cliente.

**Alternativa B — Gateway REST que agrega respuestas**
Un servidor REST central que llama a cada microservicio y retorna JSON compuesto.

**Descarte de B:**
Se descarta porque limita al frontend: siempre recibe la respuesta completa aunque solo necesite un subconjunto de campos. GraphQL resuelve esto nativamente, permitiendo al cliente pedir exactamente lo que necesita en una sola petición.

**Alternativa C — Gateway GraphQL con resolvers distribuidos (seleccionada)**
Un servidor Apollo que expone un único schema GraphQL. Los resolvers de campo se encargan de consultar el microservicio correspondiente para resolver referencias entre entidades.

**Selección:**
Se selecciona la alternativa C.

**Justificación:**
GraphQL como capa de coordinación permite que el cliente haga una sola consulta para obtener datos de múltiples microservicios. Los resolvers de campo en el gateway implementan el "join distribuido" sin que el cliente sepa nada de la infraestructura subyacente. Si en el futuro se decide migrar un microservicio a gRPC o a otro lenguaje, solo cambia el helper de comunicación en el gateway, no el contrato con el frontend.

---

### Decisión 3: Base de datos por microservicio

**Alternativa A — Base de datos compartida**
Todos los microservicios escriben y leen de la misma instancia MongoDB, usando colecciones diferentes.

**Descarte de A:**
Se descarta porque comparte el estado entre servicios, lo que genera acoplamiento a nivel de datos. Si ms-practicas necesita agregar un índice a la colección de usuarios para mejorar una query, eso puede afectar el rendimiento de ms-usuarios. Además, impide escalar las bases de datos de forma independiente.

**Alternativa B — Base de datos por microservicio (seleccionada)**
Cada servicio tiene su propia base de datos MongoDB: `ms_usuarios`, `ms_practicas`, `ms_evaluaciones`, `ms_documentos`, `ms_notificaciones`.

**Selección:**
Se selecciona la alternativa B.

**Justificación:**
La base de datos por microservicio es el patrón que garantiza el bajo acoplamiento a nivel de datos. Ningún servicio puede hacer queries directas sobre los datos de otro; la única forma de acceder a datos externos es a través de las APIs REST. Esto permite cambiar el motor de base de datos de un servicio (por ejemplo, usar PostgreSQL para evaluaciones por su soporte nativo de JSON estructurado) sin afectar a los demás.

---

### Decisión 4: Referencias entre microservicios por ID externo

**Alternativa A — Replicar datos entre microservicios**
Cuando ms-practicas necesita información del alumno, guarda una copia de los datos del alumno en su propia base de datos.

**Descarte de A:**
Se descarta porque introduce inconsistencia de datos: si el alumno actualiza su correo en ms-usuarios, ms-practicas tendría una copia desactualizada. Mantener esa sincronía requeriría eventos o mecanismos adicionales que complican el sistema.

**Alternativa B — Referencias por ID externo con resolución en el gateway (seleccionada)**
Cada microservicio guarda solo el ID de las entidades que le pertenecen a otro servicio. El gateway es quien resuelve esas referencias consultando el microservicio correspondiente.

**Selección:**
Se selecciona la alternativa B.

**Justificación:**
Esta estrategia mantiene cada microservicio simple y sin dependencias directas de otros. La resolución de referencias ocurre en el gateway mediante resolvers de campo, que es exactamente la capa diseñada para coordinar. Si una referencia no se puede resolver (porque el microservicio está caído), el gateway puede devolver null en ese campo sin romper toda la respuesta.

---

### Decisión 5: Estructura interna de cada microservicio

**Alternativa A — Separar en carpetas de controllers, services y repositories**
Estructura tipo MVC completa con tres capas claramente separadas.

**Descarte de A:**
Se descarta para los microservicios de este sistema porque el volumen de lógica de negocio en cada uno no lo justifica. La mayoría de las operaciones son CRUD directos sobre MongoDB. Agregar tres capas donde solo hay una sería over-engineering que dificulta la lectura sin aportar beneficio real.

**Alternativa B — Todo en un único archivo index.js (seleccionada)**
Modelos, rutas y lógica en un solo archivo por microservicio.

**Selección:**
Se selecciona la alternativa B con una variante: los modelos de ms-usuarios se separan en un archivo models.js propio por la cantidad de entidades que maneja.

**Justificación:**
Para microservicios con responsabilidades acotadas, un archivo único facilita la lectura y el mantenimiento. La separación por carpetas tiene sentido cuando la lógica de negocio crece o cuando se necesita testear las capas de forma independiente. En ese punto, la migración desde un archivo único hacia una estructura de capas es sencilla y gradual. Forzar esa estructura desde el inicio sería agregar complejidad anticipada que no resuelve ningún problema actual.

---

## Diagrama de clases y relaciones

```
┌─────────────────────────────────────────────────────────────────┐
│                        ms-usuarios                              │
│                                                                 │
│  ┌──────────┐     ┌──────────┐     ┌──────────────────────┐   │
│  │ Usuario  │     │ Carrera  │     │        Sede          │   │
│  │──────────│     │──────────│     │──────────────────────│   │
│  │ nombre   │     │ nombre   │     │ nombre               │   │
│  │ apellido │     └──────────┘     │ ubicacion            │   │
│  │ correo   │                      └──────────────────────┘   │
│  │ contrasena│                                                  │
│  │ telefono │                                                   │
│  └────┬─────┘                                                   │
│       │ «usa»                                                   │
│  ┌────┴────┐ ┌─────────┐ ┌──────────────────┐ ┌───────────┐  │
│  │ Alumno  │ │ Docente │ │CoordinadorCarrera│ │JefeCarrera│  │
│  │ Empleador│ └─────────┘ └──────────────────┘ └───────────┘  │
│  └─────────┘                                                    │
└─────────────────────────────────────────────────────────────────┘
         │                    │
         │ alumnoId           │ docenteId, centroId
         ▼                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                        ms-practicas                             │
│                                                                 │
│  ┌───────────────────────────────┐  ┌───────────────────────┐ │
│  │           Practica            │  │    CentroPractica     │ │
│  │───────────────────────────────│  │───────────────────────│ │
│  │ alumnoId (ext → ms-usuarios)  │  │ nombreEmpresa         │ │
│  │ docenteId (ext → ms-usuarios) │  │ direccion             │ │
│  │ centroId ──────────────────────→ │ telefono              │ │
│  │ informeId (ext → ms-documentos│  │ rubro                 │ │
│  │ fechaInicio, fechaTermino     │  └───────────────────────┘ │
│  │ tipo, estado                  │                             │
│  └───────────────────────────────┘                             │
└─────────────────────────────────────────────────────────────────┘
         │ informePracticaId
         ▼
┌─────────────────────────────────────────────────────────────────┐
│                       ms-documentos                             │
│                                                                 │
│  ┌────────────┐   ┌────────────────────┐  ┌────────────────┐  │
│  │ Documento  │   │  InformePractica   │  │DocumentoApoyo  │  │
│  │────────────│   │────────────────────│  │────────────────│  │
│  │ nombre     │◄──│ documentoId        │  │ documentoId ───┤  │
│  │ urlArchivo │   │ estado             │  │ nombre         │  │
│  │ fechaSubida│◄──│ observaciones      │  └────────────────┘  │
│  └────────────┘   └────────────────────┘                       │
└─────────────────────────────────────────────────────────────────┘
         │ informePracticaId
         ▼
┌─────────────────────────────────────────────────────────────────┐
│                      ms-evaluaciones                            │
│                                                                 │
│  ┌──────────────┐                                               │
│  │  Formulario  │◄───────────────────────────────┐            │
│  │──────────────│                                │            │
│  │ fecha, estado│                                │            │
│  └──────────────┘                                │            │
│       ▲                                          │            │
│  ┌────┴───┐  ┌────────┐  ┌────────────────────┐ │            │
│  │ Acta1  │  │ Acta2  │  │EvaluacionInforme   │ │            │
│  │────────│  │────────│  │────────────────────│ │            │
│  │formula │  │formula │  │formularioId        │ │            │
│  │centroId│  │criterios│  │criterios           │ │            │
│  │online  │  │notaPond │  │informePracticaId   │ │            │
│  │tareas  │  └────┬───┘  │notaPonderada        │ │            │
│  └────────┘       │      └────────────┬────────┘ │            │
│                   │                   │           │            │
│                   └──────────┐        │           │            │
│                              ▼        ▼           │            │
│                         ┌──────────────────────┐  │            │
│                         │      ActaFinal       │  │            │
│                         │──────────────────────│  │            │
│                         │ formularioId ────────┴──┘            │
│                         │ acta2Id                              │
│                         │ evaluacionId                         │
│                         │ notaPonderada                        │
│                         └──────────────────────┘               │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                     ms-notificaciones                           │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                     Notificacion                         │  │
│  │──────────────────────────────────────────────────────────│  │
│  │ usuarioId (ext → ms-usuarios)                            │  │
│  │ mensaje, leido, fechaEnvio                               │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### Relaciones utilizadas y justificación

**Asociación (referencia por ID externo):** se usa entre servicios distintos. Por ejemplo, Practica guarda `alumnoId` pero no embebe el objeto Alumno. Esto reduce el acoplamiento: ningún servicio depende del esquema interno de otro.

**Composición (dentro del mismo servicio):** InformePractica y DocumentoApoyo componen un Documento. Si se elimina el InformePractica, el Documento base puede seguir existiendo. Se descartó la herencia para estos casos porque en JavaScript/Mongoose no existe herencia de esquemas de forma natural, y los campos que comparten son mínimos.

**Herencia descartada para los roles de usuario:** aunque Alumno, Docente, CoordinadorCarrera y JefeCarrera comparten la referencia a Usuario, se decidió no modelarlos como herencia sino como entidades separadas que referencian al mismo Usuario. Esto permite que un mismo usuario tenga múltiples roles sin duplicar datos de login, y evita los problemas de las jerarquías de herencia en bases de datos documentales.
