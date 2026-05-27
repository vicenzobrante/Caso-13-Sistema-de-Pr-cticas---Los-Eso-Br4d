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
    getUsuario: (_, { id }) => get('usuarios', `/usuarios/${id}`),
    getUsuarios: () => get('usuarios', '/usuarios'),
    getAlumno: (_, { id }) => get('usuarios', `/alumnos/${id}`),
    getAlumnos: () => get('usuarios', '/alumnos'),
    getDocente: (_, { id }) => get('usuarios', `/docentes/${id}`),
    getDocentes: () => get('usuarios', '/docentes'),
    getCoordinadorCarrera: (_, { id }) => get('usuarios', `/coordinadores/${id}`),
    getCoordinadoresCarrera: () => get('usuarios', '/coordinadores'),
    getJefeCarrera: (_, { id }) => get('usuarios', `/jefes/${id}`),
    getJefesCarrera: () => get('usuarios', '/jefes'),
    getEmpleador: (_, { id }) => get('usuarios', `/empleadores/${id}`),
    getEmpleadores: () => get('usuarios', '/empleadores'),
    getCarrera: (_, { id }) => get('usuarios', `/carreras/${id}`),
    getCarreras: () => get('usuarios', '/carreras'),
    getSede: (_, { id }) => get('usuarios', `/sedes/${id}`),
    getSedes: () => get('usuarios', '/sedes'),

    // Practicas
    getPractica: (_, { id }) => get('practicas', `/practicas/${id}`),
    getPracticas: () => get('practicas', '/practicas'),
    getCentroPractica: (_, { id }) => get('practicas', `/centros/${id}`),
    getCentrosPractica: () => get('practicas', '/centros'),

    // Documentos
    getDocumento: (_, { id }) => get('documentos', `/documentos/${id}`),
    getDocumentos: () => get('documentos', '/documentos'),
    getDocumentoApoyo: (_, { id }) => get('documentos', `/apoyo/${id}`),
    getDocumentosApoyo: () => get('documentos', '/apoyo'),
    getInformePractica: (_, { id }) => get('documentos', `/informes/${id}`),
    getInformesPractica: () => get('documentos', '/informes'),

    // Evaluaciones
    getFormulario: (_, { id }) => get('evaluaciones', `/formularios/${id}`),
    getFormularios: () => get('evaluaciones', '/formularios'),
    getActa1: (_, { id }) => get('evaluaciones', `/actas1/${id}`),
    getActas1: () => get('evaluaciones', '/actas1'),
    getActa2: (_, { id }) => get('evaluaciones', `/actas2/${id}`),
    getActas2: () => get('evaluaciones', '/actas2'),
    getEvaluacionInformePractica: (_, { id }) => get('evaluaciones', `/evaluaciones/${id}`),
    getEvaluacionesInformesPractica: () => get('evaluaciones', '/evaluaciones'),
    getActaFinal: (_, { id }) => get('evaluaciones', `/actasfinal/${id}`),
    getActasFinal: () => get('evaluaciones', '/actasfinal'),

    // Notificaciones
    getNotificacion: (_, { id }) => get('notificaciones', `/notificaciones/${id}`),
    getNotificaciones: () => get('notificaciones', '/notificaciones'),
    getNotificacionesPorUsuario: (_, { usuarioId }) =>
      get('notificaciones', `/notificaciones/usuario/${usuarioId}`),
  },

  // ─── Mutations ─────────────────────────────────────────────────────

  Mutation: {
    // Usuarios
    createUsuario: (_, { input }) => post('usuarios', '/usuarios', input),
    updateUsuario: (_, { id, input }) => put('usuarios', `/usuarios/${id}`, input),
    deleteUsuario: (_, { id }) => del('usuarios', `/usuarios/${id}`),

    createAlumno: (_, { input }) => post('usuarios', '/alumnos', input),
    updateAlumno: (_, { id, input }) => put('usuarios', `/alumnos/${id}`, input),
    deleteAlumno: (_, { id }) => del('usuarios', `/alumnos/${id}`),

    createDocente: (_, { input }) => post('usuarios', '/docentes', input),
    updateDocente: (_, { id, input }) => put('usuarios', `/docentes/${id}`, input),
    deleteDocente: (_, { id }) => del('usuarios', `/docentes/${id}`),

    createCoordinadorCarrera: (_, { input }) => post('usuarios', '/coordinadores', input),
    updateCoordinadorCarrera: (_, { id, input }) => put('usuarios', `/coordinadores/${id}`, input),
    deleteCoordinadorCarrera: (_, { id }) => del('usuarios', `/coordinadores/${id}`),

    createJefeCarrera: (_, { input }) => post('usuarios', '/jefes', input),
    updateJefeCarrera: (_, { id, input }) => put('usuarios', `/jefes/${id}`, input),
    deleteJefeCarrera: (_, { id }) => del('usuarios', `/jefes/${id}`),

    createEmpleador: (_, { input }) => post('usuarios', '/empleadores', input),
    updateEmpleador: (_, { id, input }) => put('usuarios', `/empleadores/${id}`, input),
    deleteEmpleador: (_, { id }) => del('usuarios', `/empleadores/${id}`),

    createCarrera: (_, { input }) => post('usuarios', '/carreras', input),
    updateCarrera: (_, { id, input }) => put('usuarios', `/carreras/${id}`, input),
    deleteCarrera: (_, { id }) => del('usuarios', `/carreras/${id}`),

    createSede: (_, { input }) => post('usuarios', '/sedes', input),
    updateSede: (_, { id, input }) => put('usuarios', `/sedes/${id}`, input),
    deleteSede: (_, { id }) => del('usuarios', `/sedes/${id}`),

    // Practicas
    createPractica: (_, { input }) => post('practicas', '/practicas', input),
    updatePractica: (_, { id, input }) => put('practicas', `/practicas/${id}`, input),
    deletePractica: (_, { id }) => del('practicas', `/practicas/${id}`),

    createCentroPractica: (_, { input }) => post('practicas', '/centros', input),
    updateCentroPractica: (_, { id, input }) => put('practicas', `/centros/${id}`, input),
    deleteCentroPractica: (_, { id }) => del('practicas', `/centros/${id}`),

    // Documentos
    createDocumento: (_, { input }) => post('documentos', '/documentos', input),
    updateDocumento: (_, { id, input }) => put('documentos', `/documentos/${id}`, input),
    deleteDocumento: (_, { id }) => del('documentos', `/documentos/${id}`),

    createDocumentoApoyo: (_, { input }) => post('documentos', '/apoyo', input),
    updateDocumentoApoyo: (_, { id, input }) => put('documentos', `/apoyo/${id}`, input),
    deleteDocumentoApoyo: (_, { id }) => del('documentos', `/apoyo/${id}`),

    createInformePractica: (_, { input }) => post('documentos', '/informes', input),
    updateInformePractica: (_, { id, input }) => put('documentos', `/informes/${id}`, input),
    deleteInformePractica: (_, { id }) => del('documentos', `/informes/${id}`),

    // Evaluaciones
    createFormulario: (_, { input }) => post('evaluaciones', '/formularios', input),
    updateFormulario: (_, { id, input }) => put('evaluaciones', `/formularios/${id}`, input),
    deleteFormulario: (_, { id }) => del('evaluaciones', `/formularios/${id}`),

    createActa1: (_, { input }) => post('evaluaciones', '/actas1', input),
    updateActa1: (_, { id, input }) => put('evaluaciones', `/actas1/${id}`, input),
    deleteActa1: (_, { id }) => del('evaluaciones', `/actas1/${id}`),

    createActa2: (_, { input }) => post('evaluaciones', '/actas2', input),
    updateActa2: (_, { id, input }) => put('evaluaciones', `/actas2/${id}`, input),
    deleteActa2: (_, { id }) => del('evaluaciones', `/actas2/${id}`),

    createEvaluacionInformePractica: (_, { input }) => post('evaluaciones', '/evaluaciones', input),
    updateEvaluacionInformePractica: (_, { id, input }) =>
      put('evaluaciones', `/evaluaciones/${id}`, input),
    deleteEvaluacionInformePractica: (_, { id }) => del('evaluaciones', `/evaluaciones/${id}`),

    createActaFinal: (_, { input }) => post('evaluaciones', '/actasfinal', input),
    updateActaFinal: (_, { id, input }) => put('evaluaciones', `/actasfinal/${id}`, input),
    deleteActaFinal: (_, { id }) => del('evaluaciones', `/actasfinal/${id}`),

    // Notificaciones
    createNotificacion: (_, { input }) => post('notificaciones', '/notificaciones', input),
    updateNotificacion: (_, { id, input }) => put('notificaciones', `/notificaciones/${id}`, input),
    deleteNotificacion: (_, { id }) => del('notificaciones', `/notificaciones/${id}`),
  },
};

module.exports = resolvers;
