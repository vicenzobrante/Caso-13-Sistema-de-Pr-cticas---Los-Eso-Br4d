const { gql } = require('apollo-server');

// Acá se definen todos los tipos del sistema de forma centralizada.
// El gateway no tiene lógica de negocio: su único trabajo es coordinar
// las peticiones hacia los microservicios correspondientes.

const typeDefs = gql`
  scalar JSON

  # ─── Tipos de dominio ──────────────────────────────────────────────

  type Usuario {
    id: ID!
    nombre: String!
    apellido: String!
    correo: String!
    telefono: String
  }

  type Carrera {
    id: ID!
    nombre: String!
  }

  type Sede {
    id: ID!
    nombre: String!
    ubicacion: String!
  }

  type Alumno {
    id: ID!
    usuario: Usuario!
    matricula: String!
    carrera: Carrera!
    semestre: Int!
    sede: Sede!
  }

  type Docente {
    id: ID!
    usuario: Usuario!
    carrera: Carrera!
    sede: Sede!
  }

  type CoordinadorCarrera {
    id: ID!
    usuario: Usuario!
    carrera: Carrera!
    sede: Sede!
  }

  type JefeCarrera {
    id: ID!
    usuario: Usuario!
    carrera: Carrera!
    sede: Sede!
  }

  type Empleador {
    id: ID!
    usuario: Usuario!
    empresa: CentroPractica!
    cargo: String
  }

  type CentroPractica {
    id: ID!
    nombreEmpresa: String!
    direccion: String!
    telefono: String
    rubro: String
  }

  type Practica {
    id: ID!
    alumno: Alumno!
    docente: Docente
    centro: CentroPractica!
    informe: InformePractica
    fechaInicio: String!
    fechaTermino: String!
    tipo: String!
    estado: String!
  }

  type Documento {
    id: ID!
    nombre: String!
    fechaSubida: String!
    urlArchivo: String!
  }

  type DocumentoApoyo {
    id: ID!
    documento: Documento!
    nombre: String!
  }

  type InformePractica {
    id: ID!
    documento: Documento!
    estado: Boolean!
    observaciones: String
  }

  type Formulario {
    id: ID!
    fecha: String!
    estado: Boolean!
  }

  type Acta1 {
    id: ID!
    formulario: Formulario!
    centroDePractica: CentroPractica!
    online: Boolean!
    tareas: String!
    fechaTermino: String!
  }

  type Acta2 {
    id: ID!
    formulario: Formulario!
    criterios: JSON!
    notaPonderada: Float
  }

  type EvaluacionInformePractica {
    id: ID!
    formulario: Formulario!
    criterios: JSON!
    informePractica: InformePractica!
    notaPonderada: Float
  }

  type ActaFinal {
    id: ID!
    formulario: Formulario!
    acta2: Acta2!
    evaluacionInformePractica: EvaluacionInformePractica!
    notaPonderada: Float
  }

  type Notificacion {
    id: ID!
    usuarioId: ID!
    mensaje: String!
    leido: Boolean!
    fechaEnvio: String!
  }

  # ─── Inputs ────────────────────────────────────────────────────────

  input UsuarioInput {
    nombre: String!
    apellido: String!
    correo: String!
    contrasena: String!
    telefono: String
  }
  input UsuarioUpdateInput {
    nombre: String
    apellido: String
    correo: String
    contrasena: String
    telefono: String
  }

  input CarreraInput { nombre: String! }
  input CarreraUpdateInput { nombre: String }

  input SedeInput { nombre: String! ubicacion: String! }
  input SedeUpdateInput { nombre: String ubicacion: String }

  input AlumnoInput {
    usuarioId: ID!
    matricula: String!
    carreraId: ID!
    semestre: Int!
    sedeId: ID!
  }
  input AlumnoUpdateInput {
    matricula: String
    carreraId: ID
    semestre: Int
    sedeId: ID
  }

  input DocenteInput { usuarioId: ID! carreraId: ID! sedeId: ID! }
  input DocenteUpdateInput { carreraId: ID sedeId: ID }

  input CoordinadorCarreraInput { usuarioId: ID! carreraId: ID! sedeId: ID! }
  input CoordinadorCarreraUpdateInput { carreraId: ID sedeId: ID }

  input JefeCarreraInput { usuarioId: ID! carreraId: ID! sedeId: ID! }
  input JefeCarreraUpdateInput { carreraId: ID sedeId: ID }

  input EmpleadorInput { usuarioId: ID! empresaId: ID! cargo: String }
  input EmpleadorUpdateInput { empresaId: ID cargo: String }

  input CentroPracticaInput {
    nombreEmpresa: String!
    direccion: String!
    telefono: String
    rubro: String
  }
  input CentroPracticaUpdateInput {
    nombreEmpresa: String
    direccion: String
    telefono: String
    rubro: String
  }

  input PracticaInput {
    alumnoId: ID!
    docenteId: ID
    centroId: ID!
    fechaInicio: String!
    fechaTermino: String!
    tipo: String!
  }
  input PracticaUpdateInput {
    docenteId: ID
    centroId: ID
    informeId: ID
    fechaInicio: String
    fechaTermino: String
    tipo: String
    estado: String
  }

  input DocumentoInput {
    nombre: String!
    urlArchivo: String!
    fechaSubida: String
  }
  input DocumentoUpdateInput {
    nombre: String
    urlArchivo: String
  }

  input DocumentoApoyoInput { documentoId: ID! nombre: String! }
  input DocumentoApoyoUpdateInput { nombre: String }

  input InformePracticaInput { documentoId: ID! observaciones: String }
  input InformePracticaUpdateInput { estado: Boolean observaciones: String }

  input FormularioInput { fecha: String estado: Boolean }
  input FormularioUpdateInput { fecha: String estado: Boolean }

  input Acta1Input {
    formularioId: ID!
    centroDePracticaId: ID!
    online: Boolean
    tareas: String!
    fechaTermino: String!
  }
  input Acta1UpdateInput {
    online: Boolean
    tareas: String
    fechaTermino: String
  }

  input Acta2Input {
    formularioId: ID!
    criterios: JSON!
    notaPonderada: Float
  }
  input Acta2UpdateInput {
    criterios: JSON
    notaPonderada: Float
  }

  input EvaluacionInformePracticaInput {
    formularioId: ID!
    criterios: JSON!
    informePracticaId: ID!
    notaPonderada: Float
  }
  input EvaluacionInformePracticaUpdateInput {
    criterios: JSON
    notaPonderada: Float
  }

  input ActaFinalInput {
    formularioId: ID!
    acta2Id: ID!
    evaluacionInformePracticaId: ID!
    notaPonderada: Float
  }
  input ActaFinalUpdateInput {
    notaPonderada: Float
  }

  input NotificacionInput {
    usuarioId: ID!
    mensaje: String!
    fechaEnvio: String
  }
  input NotificacionUpdateInput {
    leido: Boolean
    mensaje: String
  }

  # ─── Queries ───────────────────────────────────────────────────────

  type Query {
    # Usuarios
    getUsuario(id: ID!): Usuario
    getUsuarios: [Usuario]
    getAlumno(id: ID!): Alumno
    getAlumnos: [Alumno]
    getDocente(id: ID!): Docente
    getDocentes: [Docente]
    getCoordinadorCarrera(id: ID!): CoordinadorCarrera
    getCoordinadoresCarrera: [CoordinadorCarrera]
    getJefeCarrera(id: ID!): JefeCarrera
    getJefesCarrera: [JefeCarrera]
    getEmpleador(id: ID!): Empleador
    getEmpleadores: [Empleador]
    getCarrera(id: ID!): Carrera
    getCarreras: [Carrera]
    getSede(id: ID!): Sede
    getSedes: [Sede]

    # Practicas
    getPractica(id: ID!): Practica
    getPracticas: [Practica]
    getCentroPractica(id: ID!): CentroPractica
    getCentrosPractica: [CentroPractica]

    # Documentos
    getDocumento(id: ID!): Documento
    getDocumentos: [Documento]
    getDocumentoApoyo(id: ID!): DocumentoApoyo
    getDocumentosApoyo: [DocumentoApoyo]
    getInformePractica(id: ID!): InformePractica
    getInformesPractica: [InformePractica]

    # Evaluaciones
    getFormulario(id: ID!): Formulario
    getFormularios: [Formulario]
    getActa1(id: ID!): Acta1
    getActas1: [Acta1]
    getActa2(id: ID!): Acta2
    getActas2: [Acta2]
    getEvaluacionInformePractica(id: ID!): EvaluacionInformePractica
    getEvaluacionesInformesPractica: [EvaluacionInformePractica]
    getActaFinal(id: ID!): ActaFinal
    getActasFinal: [ActaFinal]

    # Notificaciones
    getNotificacion(id: ID!): Notificacion
    getNotificaciones: [Notificacion]
    getNotificacionesPorUsuario(usuarioId: ID!): [Notificacion]
  }

  # ─── Mutations ─────────────────────────────────────────────────────

  type Mutation {
    # Usuarios
    createUsuario(input: UsuarioInput!): Usuario
    updateUsuario(id: ID!, input: UsuarioUpdateInput!): Usuario
    deleteUsuario(id: ID!): Usuario
    createAlumno(input: AlumnoInput!): Alumno
    updateAlumno(id: ID!, input: AlumnoUpdateInput!): Alumno
    deleteAlumno(id: ID!): Alumno
    createDocente(input: DocenteInput!): Docente
    updateDocente(id: ID!, input: DocenteUpdateInput!): Docente
    deleteDocente(id: ID!): Docente
    createCoordinadorCarrera(input: CoordinadorCarreraInput!): CoordinadorCarrera
    updateCoordinadorCarrera(id: ID!, input: CoordinadorCarreraUpdateInput!): CoordinadorCarrera
    deleteCoordinadorCarrera(id: ID!): CoordinadorCarrera
    createJefeCarrera(input: JefeCarreraInput!): JefeCarrera
    updateJefeCarrera(id: ID!, input: JefeCarreraUpdateInput!): JefeCarrera
    deleteJefeCarrera(id: ID!): JefeCarrera
    createEmpleador(input: EmpleadorInput!): Empleador
    updateEmpleador(id: ID!, input: EmpleadorUpdateInput!): Empleador
    deleteEmpleador(id: ID!): Empleador
    createCarrera(input: CarreraInput!): Carrera
    updateCarrera(id: ID!, input: CarreraUpdateInput!): Carrera
    deleteCarrera(id: ID!): Carrera
    createSede(input: SedeInput!): Sede
    updateSede(id: ID!, input: SedeUpdateInput!): Sede
    deleteSede(id: ID!): Sede

    # Practicas
    createPractica(input: PracticaInput!): Practica
    updatePractica(id: ID!, input: PracticaUpdateInput!): Practica
    deletePractica(id: ID!): Practica
    createCentroPractica(input: CentroPracticaInput!): CentroPractica
    updateCentroPractica(id: ID!, input: CentroPracticaUpdateInput!): CentroPractica
    deleteCentroPractica(id: ID!): CentroPractica

    # Documentos
    createDocumento(input: DocumentoInput!): Documento
    updateDocumento(id: ID!, input: DocumentoUpdateInput!): Documento
    deleteDocumento(id: ID!): Documento
    createDocumentoApoyo(input: DocumentoApoyoInput!): DocumentoApoyo
    updateDocumentoApoyo(id: ID!, input: DocumentoApoyoUpdateInput!): DocumentoApoyo
    deleteDocumentoApoyo(id: ID!): DocumentoApoyo
    createInformePractica(input: InformePracticaInput!): InformePractica
    updateInformePractica(id: ID!, input: InformePracticaUpdateInput!): InformePractica
    deleteInformePractica(id: ID!): InformePractica

    # Evaluaciones
    createFormulario(input: FormularioInput!): Formulario
    updateFormulario(id: ID!, input: FormularioUpdateInput!): Formulario
    deleteFormulario(id: ID!): Formulario
    createActa1(input: Acta1Input!): Acta1
    updateActa1(id: ID!, input: Acta1UpdateInput!): Acta1
    deleteActa1(id: ID!): Acta1
    createActa2(input: Acta2Input!): Acta2
    updateActa2(id: ID!, input: Acta2UpdateInput!): Acta2
    deleteActa2(id: ID!): Acta2
    createEvaluacionInformePractica(input: EvaluacionInformePracticaInput!): EvaluacionInformePractica
    updateEvaluacionInformePractica(id: ID!, input: EvaluacionInformePracticaUpdateInput!): EvaluacionInformePractica
    deleteEvaluacionInformePractica(id: ID!): EvaluacionInformePractica
    createActaFinal(input: ActaFinalInput!): ActaFinal
    updateActaFinal(id: ID!, input: ActaFinalUpdateInput!): ActaFinal
    deleteActaFinal(id: ID!): ActaFinal

    # Notificaciones
    createNotificacion(input: NotificacionInput!): Notificacion
    updateNotificacion(id: ID!, input: NotificacionUpdateInput!): Notificacion
    deleteNotificacion(id: ID!): Notificacion
  }
`;

module.exports = typeDefs;
