const GraphQLJSON = require('graphql-type-json');
const axios = require('axios');

// Cada microservicio tiene su propia URL base.
// El gateway simplemente delega las peticiones sin tocar la lógica de negocio.
const MS = {
  usuarios: process.env.MS_USUARIOS_URL || 'http://localhost:4001',
  practicas: process.env.MS_PRACTICAS_URL || 'http://localhost:4002',
  evaluaciones: process.env.MS_EVALUACIONES_URL || 'http://localhost:4003',
  documentos: process.env.MS_DOCUMENTOS_URL || 'http://localhost:4004',
  notificaciones: process.env.MS_NOTIFICACIONES_URL || 'http://localhost:4005',
};

// Helper para hacer peticiones REST a los microservicios.
// Centralizar esto acá facilita cambiar el protocolo en el futuro (ej. gRPC).
async function get(servicio, ruta) {
  try {
    const res = await axios.get(`${MS[servicio]}${ruta}`);
    return res.data;
  } catch (err) {
    // Si un microservicio está caído, devolvemos null en vez de romper todo
    console.error(`[gateway] GET ${servicio}${ruta} falló:`, err.message);
    return null;
  }
}

async function post(servicio, ruta, datos) {
  const res = await axios.post(`${MS[servicio]}${ruta}`, datos);
  return res.data;
}

async function put(servicio, ruta, datos) {
  const res = await axios.put(`${MS[servicio]}${ruta}`, datos);
  return res.data;
}

async function del(servicio, ruta) {
  const res = await axios.delete(`${MS[servicio]}${ruta}`);
  return res.data;
}

// Para los tipos que referencian entidades de otros microservicios,
// usamos resolvers de campo para hacer el "join" distribuido.
// Esto es equivalente al populate de Mongoose pero entre servicios.
const resolvers = {
  JSON: GraphQLJSON,

  // ─── Resolvers de campo (joins distribuidos) ────────────────────

  Alumno: {
    usuario: (parent) => get('usuarios', `/usuarios/${parent.usuarioId}`),
    carrera: (parent) => get('usuarios', `/carreras/${parent.carreraId}`),
    sede: (parent) => get('usuarios', `/sedes/${parent.sedeId}`),
  },

  Docente: {
    usuario: (parent) => get('usuarios', `/usuarios/${parent.usuarioId}`),
    carrera: (parent) => get('usuarios', `/carreras/${parent.carreraId}`),
    sede: (parent) => get('usuarios', `/sedes/${parent.sedeId}`),
  },

  CoordinadorCarrera: {
    usuario: (parent) => get('usuarios', `/usuarios/${parent.usuarioId}`),
    carrera: (parent) => get('usuarios', `/carreras/${parent.carreraId}`),
    sede: (parent) => get('usuarios', `/sedes/${parent.sedeId}`),
  },

  JefeCarrera: {
    usuario: (parent) => get('usuarios', `/usuarios/${parent.usuarioId}`),
    carrera: (parent) => get('usuarios', `/carreras/${parent.carreraId}`),
    sede: (parent) => get('usuarios', `/sedes/${parent.sedeId}`),
  },

  Empleador: {
    usuario: (parent) => get('usuarios', `/usuarios/${parent.usuarioId}`),
    empresa: (parent) => get('practicas', `/centros/${parent.empresaId}`),
  },

  Practica: {
    alumno: (parent) => get('usuarios', `/alumnos/${parent.alumnoId}`),
    docente: (parent) => parent.docenteId ? get('usuarios', `/docentes/${parent.docenteId}`) : null,
    centro: (parent) => get('practicas', `/centros/${parent.centroId}`),
    informe: (parent) => parent.informeId ? get('documentos', `/informes/${parent.informeId}`) : null,
  },

  InformePractica: {
    documento: (parent) => get('documentos', `/documentos/${parent.documentoId}`),
  },

  DocumentoApoyo: {
    documento: (parent) => get('documentos', `/documentos/${parent.documentoId}`),
  },

  Acta1: {
    formulario: (parent) => get('evaluaciones', `/formularios/${parent.formularioId}`),
    centroDePractica: (parent) => get('practicas', `/centros/${parent.centroDePracticaId}`),
  },

  Acta2: {
    formulario: (parent) => get('evaluaciones', `/formularios/${parent.formularioId}`),
  },

  EvaluacionInformePractica: {
    formulario: (parent) => get('evaluaciones', `/formularios/${parent.formularioId}`),
    informePractica: (parent) => get('documentos', `/informes/${parent.informePracticaId}`),
  },

  ActaFinal: {
    formulario: (parent) => get('evaluaciones', `/formularios/${parent.formularioId}`),
    acta2: (parent) => get('evaluaciones', `/actas2/${parent.acta2Id}`),
    evaluacionInformePractica: (parent) =>
      get('evaluaciones', `/evaluaciones/${parent.evaluacionInformePracticaId}`),
  },

  // ─── Queries ───────────────────────────────────────────────────────

  Query: {
    // Usuarios
    getUsuario: (_, { _id }) => get('usuarios', `/usuarios/${_id}`),
    getUsuarios: () => get('usuarios', '/usuarios'),
    getAlumno: (_, { _id }) => get('usuarios', `/alumnos/${_id}`),
    getAlumnos: () => get('usuarios', '/alumnos'),
    getDocente: (_, { _id }) => get('usuarios', `/docentes/${_id}`),
    getDocentes: () => get('usuarios', '/docentes'),
    getCoordinadorCarrera: (_, { _id }) => get('usuarios', `/coordinadores/${_id}`),
    getCoordinadoresCarrera: () => get('usuarios', '/coordinadores'),
    getJefeCarrera: (_, { _id }) => get('usuarios', `/jefes/${_id}`),
    getJefesCarrera: () => get('usuarios', '/jefes'),
    getEmpleador: (_, { _id }) => get('usuarios', `/empleadores/${_id}`),
    getEmpleadores: () => get('usuarios', '/empleadores'),
    getCarrera: (_, { _id }) => get('usuarios', `/carreras/${_id}`),
    getCarreras: () => get('usuarios', '/carreras'),
    getSede: (_, { _id }) => get('usuarios', `/sedes/${_id}`),
    getSedes: () => get('usuarios', '/sedes'),

    // Practicas
    getPractica: (_, { _id }) => get('practicas', `/practicas/${_id}`),
    getPracticas: () => get('practicas', '/practicas'),
    getCentroPractica: (_, { _id }) => get('practicas', `/centros/${_id}`),
    getCentrosPractica: () => get('practicas', '/centros'),

    // Documentos
    getDocumento: (_, { _id }) => get('documentos', `/documentos/${_id}`),
    getDocumentos: () => get('documentos', '/documentos'),
    getDocumentoApoyo: (_, { _id }) => get('documentos', `/apoyo/${_id}`),
    getDocumentosApoyo: () => get('documentos', '/apoyo'),
    getInformePractica: (_, { _id }) => get('documentos', `/informes/${_id}`),
    getInformesPractica: () => get('documentos', '/informes'),

    // Evaluaciones
    getFormulario: (_, { _id }) => get('evaluaciones', `/formularios/${_id}`),
    getFormularios: () => get('evaluaciones', '/formularios'),
    getActa1: (_, { _id }) => get('evaluaciones', `/actas1/${_id}`),
    getActas1: () => get('evaluaciones', '/actas1'),
    getActa2: (_, { _id }) => get('evaluaciones', `/actas2/${_id}`),
    getActas2: () => get('evaluaciones', '/actas2'),
    getEvaluacionInformePractica: (_, { _id }) => get('evaluaciones', `/evaluaciones/${_id}`),
    getEvaluacionesInformesPractica: () => get('evaluaciones', '/evaluaciones'),
    getActaFinal: (_, { _id }) => get('evaluaciones', `/actasfinal/${_id}`),
    getActasFinal: () => get('evaluaciones', '/actasfinal'),

    // Notificaciones
    getNotificacion: (_, { _id }) => get('notificaciones', `/notificaciones/${_id}`),
    getNotificaciones: () => get('notificaciones', '/notificaciones'),
    getNotificacionesPorUsuario: (_, { usuarioId }) =>
      get('notificaciones', `/notificaciones/usuario/${usuarioId}`),
  },

  // ─── Mutations ─────────────────────────────────────────────────────

  Mutation: {
    // Usuarios
    createUsuario: (_, { input }) => post('usuarios', '/usuarios', input),
    updateUsuario: (_, { _id, input }) => put('usuarios', `/usuarios/${_id}`, input),
    deleteUsuario: (_, { _id }) => del('usuarios', `/usuarios/${_id}`),

    createAlumno: (_, { input }) => post('usuarios', '/alumnos', input),
    updateAlumno: (_, { _id, input }) => put('usuarios', `/alumnos/${_id}`, input),
    deleteAlumno: (_, { _id }) => del('usuarios', `/alumnos/${_id}`),

    createDocente: (_, { input }) => post('usuarios', '/docentes', input),
    updateDocente: (_, { _id, input }) => put('usuarios', `/docentes/${_id}`, input),
    deleteDocente: (_, { _id }) => del('usuarios', `/docentes/${_id}`),

    createCoordinadorCarrera: (_, { input }) => post('usuarios', '/coordinadores', input),
    updateCoordinadorCarrera: (_, { _id, input }) => put('usuarios', `/coordinadores/${_id}`, input),
    deleteCoordinadorCarrera: (_, { _id }) => del('usuarios', `/coordinadores/${_id}`),

    createJefeCarrera: (_, { input }) => post('usuarios', '/jefes', input),
    updateJefeCarrera: (_, { _id, input }) => put('usuarios', `/jefes/${_id}`, input),
    deleteJefeCarrera: (_, { _id }) => del('usuarios', `/jefes/${_id}`),

    createEmpleador: (_, { input }) => post('usuarios', '/empleadores', input),
    updateEmpleador: (_, { _id, input }) => put('usuarios', `/empleadores/${_id}`, input),
    deleteEmpleador: (_, { _id }) => del('usuarios', `/empleadores/${_id}`),

    createCarrera: (_, { input }) => post('usuarios', '/carreras', input),
    updateCarrera: (_, { _id, input }) => put('usuarios', `/carreras/${_id}`, input),
    deleteCarrera: (_, { _id }) => del('usuarios', `/carreras/${_id}`),

    createSede: (_, { input }) => post('usuarios', '/sedes', input),
    updateSede: (_, { _id, input }) => put('usuarios', `/sedes/${_id}`, input),
    deleteSede: (_, { _id }) => del('usuarios', `/sedes/${_id}`),

    // Practicas
    createPractica: (_, { input }) => post('practicas', '/practicas', input),
    updatePractica: (_, { _id, input }) => put('practicas', `/practicas/${_id}`, input),
    deletePractica: (_, { _id }) => del('practicas', `/practicas/${_id}`),

    createCentroPractica: (_, { input }) => post('practicas', '/centros', input),
    updateCentroPractica: (_, { _id, input }) => put('practicas', `/centros/${_id}`, input),
    deleteCentroPractica: (_, { _id }) => del('practicas', `/centros/${_id}`),

    // Documentos
    createDocumento: (_, { input }) => post('documentos', '/documentos', input),
    updateDocumento: (_, { _id, input }) => put('documentos', `/documentos/${_id}`, input),
    deleteDocumento: (_, { _id }) => del('documentos', `/documentos/${_id}`),

    createDocumentoApoyo: (_, { input }) => post('documentos', '/apoyo', input),
    updateDocumentoApoyo: (_, { _id, input }) => put('documentos', `/apoyo/${_id}`, input),
    deleteDocumentoApoyo: (_, { _id }) => del('documentos', `/apoyo/${_id}`),

    createInformePractica: (_, { input }) => post('documentos', '/informes', input),
    updateInformePractica: (_, { _id, input }) => put('documentos', `/informes/${_id}`, input),
    deleteInformePractica: (_, { _id }) => del('documentos', `/informes/${_id}`),

    // Evaluaciones
    createFormulario: (_, { input }) => post('evaluaciones', '/formularios', input),
    updateFormulario: (_, { _id, input }) => put('evaluaciones', `/formularios/${_id}`, input),
    deleteFormulario: (_, { _id }) => del('evaluaciones', `/formularios/${_id}`),

    createActa1: (_, { input }) => post('evaluaciones', '/actas1', input),
    updateActa1: (_, { _id, input }) => put('evaluaciones', `/actas1/${_id}`, input),
    deleteActa1: (_, { _id }) => del('evaluaciones', `/actas1/${_id}`),

    createActa2: (_, { input }) => post('evaluaciones', '/actas2', input),
    updateActa2: (_, { _id, input }) => put('evaluaciones', `/actas2/${_id}`, input),
    deleteActa2: (_, { _id }) => del('evaluaciones', `/actas2/${_id}`),

    createEvaluacionInformePractica: (_, { input }) => post('evaluaciones', '/evaluaciones', input),
    updateEvaluacionInformePractica: (_, { _id, input }) =>
      put('evaluaciones', `/evaluaciones/${_id}`, input),
    deleteEvaluacionInformePractica: (_, { _id }) => del('evaluaciones', `/evaluaciones/${_id}`),

    createActaFinal: (_, { input }) => post('evaluaciones', '/actasfinal', input),
    updateActaFinal: (_, { _id, input }) => put('evaluaciones', `/actasfinal/${_id}`, input),
    deleteActaFinal: (_, { _id }) => del('evaluaciones', `/actasfinal/${_id}`),

    // Notificaciones
    createNotificacion: (_, { input }) => post('notificaciones', '/notificaciones', input),
    updateNotificacion: (_, { _id, input }) => put('notificaciones', `/notificaciones/${_id}`, input),
    deleteNotificacion: (_, { _id }) => del('notificaciones', `/notificaciones/${_id}`),
  },
};

module.exports = resolvers;
