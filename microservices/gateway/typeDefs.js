const { gql } = require('apollo-server');

// Acá se definen todos los tipos del sistema de forma centralizada.
// El gateway no tiene lógica de negocio: su único trabajo es coordinar
// las peticiones hacia los microservicios correspondientes.

const typeDefs = gql`
  scalar JSON

  # ─── Tipos de dominio ──────────────────────────────────────────────

  type Usuario {
    _id: ID!
    nombre: String!
    apellido: String!
    correo: String!
    telefono: String
  }

  type Carrera {
    _id: ID!
    nombre: String!
  }

  type Sede {
    _id: ID!
    nombre: String!
    ubicacion: String!
  }

  type Alumno {
    _id: ID!
    usuario: Usuario!
    matricula: String!
    carrera: Carrera!
    semestre: Int!
    sede: Sede!
  }

  type Docente {
    _id: ID!
    usuario: Usuario!
    carrera: Carrera!
    sede: Sede!
  }

  type CoordinadorCarrera {
    _id: ID!
    usuario: Usuario!
    carrera: Carrera!
    sede: Sede!
  }

  type JefeCarrera {
    _id: ID!
    usuario: Usuario!
    carrera: Carrera!
    sede: Sede!
  }

  type Empleador {
    _id: ID!
    usuario: Usuario!
    empresa: String!
    cargo: String
  }

  type CentroPractica {
    _id: ID!
    nombreEmpresa: String!
    direccion: String!
    telefono: String
    rubro: String
  }

  type Practica {
    _id: ID!
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
    _id: ID!
    nombre: String!
    fechaSubida: String!
    urlArchivo: String!
  }

  type DocumentoApoyo {
    _id: ID!
    documento: Documento!
    nombre: String!
  }

  type InformePractica {
    _id: ID!
    documento: Documento!
    estado: Boolean!
    observaciones: String
  }

  type Formulario {
    _id: ID!
    fecha: String!
    estado: Boolean!
  }

  type Acta1 {
    _id: ID!
    formulario: Formulario!
    centroDePractica: CentroPractica!
    online: Boolean!
    tareas: String!
    fechaTermino: String!
  }

  type Acta2 {
    _id: ID!
    formulario: Formulario!
    criterios: JSON!
    notaPonderada: Float
  }

  type EvaluacionInformePractica {
    _id: ID!
    formulario: Formulario!
    criterios: JSON!
    informePractica: InformePractica!
    notaPonderada: Float
  }

  type ActaFinal {
    _id: ID!
    formulario: Formulario!
    acta2: Acta2!
    evaluacionInformePractica: EvaluacionInformePractica!
    notaPonderada: Float
  }

  type Notificacion {
    _id: ID!
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

  input EmpleadorInput { usuarioId: ID! empresa: String cargo: String }
  input EmpleadorUpdateInput { empresa: String cargo: String }

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
    getUsuario(_id: ID!): Usuario
    getUsuarios: [Usuario]
    getAlumno(_id: ID!): Alumno
    getAlumnos: [Alumno]
    getDocente(_id: ID!): Docente
    getDocentes: [Docente]
    getCoordinadorCarrera(_id: ID!): CoordinadorCarrera
    getCoordinadoresCarrera: [CoordinadorCarrera]
    getJefeCarrera(_id: ID!): JefeCarrera
    getJefesCarrera: [JefeCarrera]
    getEmpleador(_id: ID!): Empleador
    getEmpleadores: [Empleador]
    getCarrera(_id: ID!): Carrera
    getCarreras: [Carrera]
    getSede(_id: ID!): Sede
    getSedes: [Sede]

    # Practicas
    getPractica(_id: ID!): Practica
    getPracticas: [Practica]
    getCentroPractica(_id: ID!): CentroPractica
    getCentrosPractica: [CentroPractica]

    # Documentos
    getDocumento(_id: ID!): Documento
    getDocumentos: [Documento]
    getDocumentoApoyo(_id: ID!): DocumentoApoyo
    getDocumentosApoyo: [DocumentoApoyo]
    getInformePractica(_id: ID!): InformePractica
    getInformesPractica: [InformePractica]

    # Evaluaciones
    getFormulario(_id: ID!): Formulario
    getFormularios: [Formulario]
    getActa1(_id: ID!): Acta1
    getActas1: [Acta1]
    getActa2(_id: ID!): Acta2
    getActas2: [Acta2]
    getEvaluacionInformePractica(_id: ID!): EvaluacionInformePractica
    getEvaluacionesInformesPractica: [EvaluacionInformePractica]
    getActaFinal(_id: ID!): ActaFinal
    getActasFinal: [ActaFinal]

    # Notificaciones
    getNotificacion(_id: ID!): Notificacion
    getNotificaciones: [Notificacion]
    getNotificacionesPorUsuario(usuarioId: ID!): [Notificacion]
  }

  # ─── Mutations ─────────────────────────────────────────────────────

  type Mutation {
    # Usuarios
    createUsuario(input: UsuarioInput!): Usuario
    updateUsuario(_id: ID!, input: UsuarioUpdateInput!): Usuario
    deleteUsuario(_id: ID!): Usuario
    createAlumno(input: AlumnoInput!): Alumno
    updateAlumno(_id: ID!, input: AlumnoUpdateInput!): Alumno
    deleteAlumno(_id: ID!): Alumno
    createDocente(input: DocenteInput!): Docente
    updateDocente(_id: ID!, input: DocenteUpdateInput!): Docente
    deleteDocente(_id: ID!): Docente
    createCoordinadorCarrera(input: CoordinadorCarreraInput!): CoordinadorCarrera
    updateCoordinadorCarrera(_id: ID!, input: CoordinadorCarreraUpdateInput!): CoordinadorCarrera
    deleteCoordinadorCarrera(_id: ID!): CoordinadorCarrera
    createJefeCarrera(input: JefeCarreraInput!): JefeCarrera
    updateJefeCarrera(_id: ID!, input: JefeCarreraUpdateInput!): JefeCarrera
    deleteJefeCarrera(_id: ID!): JefeCarrera
    createEmpleador(input: EmpleadorInput!): Empleador
    updateEmpleador(_id: ID!, input: EmpleadorUpdateInput!): Empleador
    deleteEmpleador(_id: ID!): Empleador
    createCarrera(input: CarreraInput!): Carrera
    updateCarrera(_id: ID!, input: CarreraUpdateInput!): Carrera
    deleteCarrera(_id: ID!): Carrera
    createSede(input: SedeInput!): Sede
    updateSede(_id: ID!, input: SedeUpdateInput!): Sede
    deleteSede(_id: ID!): Sede

    # Practicas
    createPractica(input: PracticaInput!): Practica
    updatePractica(_id: ID!, input: PracticaUpdateInput!): Practica
    deletePractica(_id: ID!): Practica
    createCentroPractica(input: CentroPracticaInput!): CentroPractica
    updateCentroPractica(_id: ID!, input: CentroPracticaUpdateInput!): CentroPractica
    deleteCentroPractica(_id: ID!): CentroPractica

    # Documentos
    createDocumento(input: DocumentoInput!): Documento
    updateDocumento(_id: ID!, input: DocumentoUpdateInput!): Documento
    deleteDocumento(_id: ID!): Documento
    createDocumentoApoyo(input: DocumentoApoyoInput!): DocumentoApoyo
    updateDocumentoApoyo(_id: ID!, input: DocumentoApoyoUpdateInput!): DocumentoApoyo
    deleteDocumentoApoyo(_id: ID!): DocumentoApoyo
    createInformePractica(input: InformePracticaInput!): InformePractica
    updateInformePractica(_id: ID!, input: InformePracticaUpdateInput!): InformePractica
    deleteInformePractica(_id: ID!): InformePractica

    # Evaluaciones
    createFormulario(input: FormularioInput!): Formulario
    updateFormulario(_id: ID!, input: FormularioUpdateInput!): Formulario
    deleteFormulario(_id: ID!): Formulario
    createActa1(input: Acta1Input!): Acta1
    updateActa1(_id: ID!, input: Acta1UpdateInput!): Acta1
    deleteActa1(_id: ID!): Acta1
    createActa2(input: Acta2Input!): Acta2
    updateActa2(_id: ID!, input: Acta2UpdateInput!): Acta2
    deleteActa2(_id: ID!): Acta2
    createEvaluacionInformePractica(input: EvaluacionInformePracticaInput!): EvaluacionInformePractica
    updateEvaluacionInformePractica(_id: ID!, input: EvaluacionInformePracticaUpdateInput!): EvaluacionInformePractica
    deleteEvaluacionInformePractica(_id: ID!): EvaluacionInformePractica
    createActaFinal(input: ActaFinalInput!): ActaFinal
    updateActaFinal(_id: ID!, input: ActaFinalUpdateInput!): ActaFinal
    deleteActaFinal(_id: ID!): ActaFinal

    # Notificaciones
    createNotificacion(input: NotificacionInput!): Notificacion
    updateNotificacion(_id: ID!, input: NotificacionUpdateInput!): Notificacion
    deleteNotificacion(_id: ID!): Notificacion
  }
`;

module.exports = typeDefs;
