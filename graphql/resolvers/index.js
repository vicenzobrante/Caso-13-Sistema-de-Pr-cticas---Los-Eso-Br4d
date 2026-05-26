const GraphQLJSON = require('graphql-type-json');

const Alumno = require('../../models/Alumno');
const Usuario = require('../../models/Usuario');
const Notificacion = require('../../models/Notificacion');
const Practica = require('../../models/Practica');
const Documento = require('../../models/Documento');
const InformePractica = require('../../models/InformePractica');
const Acta1 = require('../../models/Acta1');
const Acta2 = require('../../models/Acta2');
const ActaFinal = require('../../models/ActaFinal');
const Carrera = require('../../models/Carrera');
const CentroPractica = require('../../models/CentroPractica');
const CoordinadorCarrera = require('../../models/CoordinadorCarrera');
const Docente = require('../../models/Docente');
const DocumentoApoyo = require('../../models/DocumentoApoyo');
const Empleador = require('../../models/Empleador');
const EvaluacionInformePractica = require('../../models/EvaluacionInformePractica');
const Formulario = require('../../models/Formulario');
const JefeCarrera = require('../../models/JefeCarrera');
const Sede = require('../../models/Sede');

const resolvers = {
    JSON: GraphQLJSON,
    Query: {
        getActa1: async (parent, args) =>
            await Acta1.findById(args.id).populate('formulario').populate('centroDePractica'),
        getActas1: async () => await Acta1.find().populate('formulario').populate('centroDePractica'),
        getActa2: async (parent, args) => await Acta2.findById(args.id).populate('formulario'),
        getActas2: async () => await Acta2.find().populate('formulario'),
        getActaFinal: async (parent, args) => await ActaFinal.findById(args.id).populate('formulario').populate('acta2').populate('evaluacionInformePractica'),
        getActasFinal: async () => await ActaFinal.find().populate('formulario').populate('acta2').populate('evaluacionInformePractica'),

        getAlumno: async (parent, args) => await Alumno.findById(args.id).populate('usuario').populate('carrera').populate('sede'),
        getAlumnos: async () => await Alumno.find().populate('usuario').populate('carrera').populate('sede'),

        getCarrera: async (parent, args) => await Carrera.findById(args.id),
        getCarreras: async () => await Carrera.find(),

        getCentroPractica: async (parent, args) => await CentroPractica.findById(args.id),
        getCentrosPractica: async () => await CentroPractica.find(),

        getCoordinadorCarrera: async (parent, args) => await CoordinadorCarrera.findById(args.id).populate('usuario').populate('carrera').populate('sede'),
        getCoordinadoresCarrera: async () => await CoordinadorCarrera.find().populate('usuario').populate('carrera').populate('sede'),

        getDocente: async (parent, args) => await Docente.findById(args.id).populate('usuario').populate('carrera').populate('sede'),
        getDocentes: async () => await Docente.find().populate('usuario').populate('carrera').populate('sede'),

        getDocumento: async (parent, args) => await Documento.findById(args.id),
        getDocumentos: async () => await Documento.find(),

        getDocumentoApoyo: async (parent, args) => await DocumentoApoyo.findById(args.id).populate('documento'),
        getDocumentosApoyo: async () => await DocumentoApoyo.find().populate('documento'),

        getEmpleador: async (parent, args) => await Empleador.findById(args.id).populate('usuario').populate('empresa'),
        getEmpleadores: async () => await Empleador.find().populate('usuario').populate('empresa'),

        getEvaluacionInformePractica: async (parent, args) => await EvaluacionInformePractica.findById(args.id).populate('formulario').populate('informePractica'),
        getEvaluacionesInformesPractica: async () => await EvaluacionInformePractica.find().populate('formulario').populate('informePractica'),

        getFormulario: async (parent, args) => await Formulario.findById(args.id),
        getFormularios: async () => await Formulario.find(),

        getInformePractica: async (parent, args) => await InformePractica.findById(args.id).populate('documento'),
        getInformesPractica: async () => await InformePractica.find().populate('documento'),

        getJefeCarrera: async (parent, args) => await JefeCarrera.findById(args.id).populate('usuario').populate('carrera').populate('sede'),
        getJefesCarrera: async () => await JefeCarrera.find().populate('usuario').populate('carrera').populate('sede'),

        getNotificacion: async (parent, args) => await Notificacion.findById(args.id).populate('usuario'),
        getNotificaciones: async () => await Notificacion.find().populate('usuario'),

        getPractica: async (parent, args) => await Practica.findById(args.id).populate({ path: 'alumno', populate: [{ path: 'usuario' }, { path: 'carrera' }, { path: 'sede' }] }).populate({ path: 'docente', populate: [{ path: 'usuario' }, { path: 'carrera' }, { path: 'sede' }] }).populate('centro').populate({ path: 'informe', populate: { path: 'documento' } }),
        getPracticas: async () => await Practica.find().populate({ path: 'alumno', populate: [{ path: 'usuario' }, { path: 'carrera' }, { path: 'sede' }] }).populate({ path: 'docente', populate: [{ path: 'usuario' }, { path: 'carrera' }, { path: 'sede' }] }).populate('centro').populate({ path: 'informe', populate: { path: 'documento' } }),

        getSede: async (parent, args) => await Sede.findById(args.id),
        getSedes: async () => await Sede.find(),

        getUsuario: async (parent, args) => await Usuario.findById(args.id),
        getUsuarios: async () => await Usuario.find(),
    },
    Mutation: {
        createUsuario: async (_, { input }) => { const u = new Usuario(input); await u.save(); return u; },
        updateUsuario: async (_, { id, input }) => await Usuario.findByIdAndUpdate(id, input, { new: true }),
        deleteUsuario: async (_, { id }) => await Usuario.findByIdAndDelete(id),

        createCarrera: async (_, { input }) => { const c = new Carrera(input); await c.save(); return c; },
        updateCarrera: async (_, { id, input }) => await Carrera.findByIdAndUpdate(id, input, { new: true }),
        deleteCarrera: async (_, { id }) => await Carrera.findByIdAndDelete(id),

        createSede: async (_, { input }) => { const s = new Sede(input); await s.save(); return s; },
        updateSede: async (_, { id, input }) => await Sede.findByIdAndUpdate(id, input, { new: true }),
        deleteSede: async (_, { id }) => await Sede.findByIdAndDelete(id),

        createCentroPractica: async (_, { input }) => { const c = new CentroPractica(input); await c.save(); return c; },
        updateCentroPractica: async (_, { id, input }) => await CentroPractica.findByIdAndUpdate(id, input, { new: true }),
        deleteCentroPractica: async (_, { id }) => await CentroPractica.findByIdAndDelete(id),

        createDocumento: async (_, { input }) => { const d = new Documento(input); await d.save(); return d; },
        updateDocumento: async (_, { id, input }) => await Documento.findByIdAndUpdate(id, input, { new: true }),
        deleteDocumento: async (_, { id }) => await Documento.findByIdAndDelete(id),

        createDocumentoApoyo: async (_, { input }) => { const da = new DocumentoApoyo(input); await da.save(); return da; },
        updateDocumentoApoyo: async (_, { id, input }) => await DocumentoApoyo.findByIdAndUpdate(id, input, { new: true }),
        deleteDocumentoApoyo: async (_, { id }) => await DocumentoApoyo.findByIdAndDelete(id),

        createInformePractica: async (_, { input }) => { const ip = new InformePractica(input); await ip.save(); return ip; },
        updateInformePractica: async (_, { id, input }) => await InformePractica.findByIdAndUpdate(id, input, { new: true }),
        deleteInformePractica: async (_, { id }) => await InformePractica.findByIdAndDelete(id),

        createPractica: async (_, { input }) => { const p = new Practica(input); await p.save(); return p; },
        updatePractica: async (_, { id, input }) => await Practica.findByIdAndUpdate(id, input, { new: true }),
        deletePractica: async (_, { id }) => await Practica.findByIdAndDelete(id),

        createFormulario: async (_, { input }) => { const f = new Formulario(input); await f.save(); return f; },
        updateFormulario: async (_, { id, input }) => await Formulario.findByIdAndUpdate(id, input, { new: true }),
        deleteFormulario: async (_, { id }) => await Formulario.findByIdAndDelete(id),

        createActa1: async (_, { input }) => { const a = new Acta1(input); await a.save(); return a; },
        updateActa1: async (_, { id, input }) => await Acta1.findByIdAndUpdate(id, input, { new: true }),
        deleteActa1: async (_, { id }) => await Acta1.findByIdAndDelete(id),

        createActa2: async (_, { input }) => { const a = new Acta2(input); await a.save(); return a; },
        updateActa2: async (_, { id, input }) => await Acta2.findByIdAndUpdate(id, input, { new: true }),
        deleteActa2: async (_, { id }) => await Acta2.findByIdAndDelete(id),

        createEvaluacionInformePractica: async (_, { input }) => { const e = new EvaluacionInformePractica(input); await e.save(); return e; },
        updateEvaluacionInformePractica: async (_, { id, input }) => await EvaluacionInformePractica.findByIdAndUpdate(id, input, { new: true }),
        deleteEvaluacionInformePractica: async (_, { id }) => await EvaluacionInformePractica.findByIdAndDelete(id),

        createActaFinal: async (_, { input }) => { const a = new ActaFinal(input); await a.save(); return a; },
        updateActaFinal: async (_, { id, input }) => await ActaFinal.findByIdAndUpdate(id, input, { new: true }),
        deleteActaFinal: async (_, { id }) => await ActaFinal.findByIdAndDelete(id),

        createCoordinadorCarrera: async (_, { input }) => { const c = new CoordinadorCarrera(input); await c.save(); return c; },
        updateCoordinadorCarrera: async (_, { id, input }) => await CoordinadorCarrera.findByIdAndUpdate(id, input, { new: true }),
        deleteCoordinadorCarrera: async (_, { id }) => await CoordinadorCarrera.findByIdAndDelete(id),

        createDocente: async (_, { input }) => { const d = new Docente(input); await d.save(); return d; },
        updateDocente: async (_, { id, input }) => await Docente.findByIdAndUpdate(id, input, { new: true }),
        deleteDocente: async (_, { id }) => await Docente.findByIdAndDelete(id),

        createEmpleador: async (_, { input }) => { const e = new Empleador(input); await e.save(); return e; },
        updateEmpleador: async (_, { id, input }) => await Empleador.findByIdAndUpdate(id, input, { new: true }),
        deleteEmpleador: async (_, { id }) => await Empleador.findByIdAndDelete(id),

        createJefeCarrera: async (_, { input }) => { const j = new JefeCarrera(input); await j.save(); return j; },
        updateJefeCarrera: async (_, { id, input }) => await JefeCarrera.findByIdAndUpdate(id, input, { new: true }),
        deleteJefeCarrera: async (_, { id }) => await JefeCarrera.findByIdAndDelete(id),

        createNotificacion: async (_, { input }) => { const n = new Notificacion(input); await n.save(); return n; },
        updateNotificacion: async (_, { id, input }) => await Notificacion.findByIdAndUpdate(id, input, { new: true }),
        deleteNotificacion: async (_, { id }) => await Notificacion.findByIdAndDelete(id),

        createAlumno: async (_, { input }) => { const { usuario, matricula, carrera, semestre, sede } = input; const newAlumno = new Alumno({ usuario, matricula, carrera, semestre, sede }); await newAlumno.save(); return Alumno.findById(newAlumno.id).populate('usuario').populate('carrera').populate('sede'); },
        updateAlumno: async (_, { id, input }) => { const updatedAlumno = await Alumno.findByIdAndUpdate(id, input, { new: true }); if (!updatedAlumno) return null; return updatedAlumno.populate('usuario').populate('carrera').populate('sede'); },
        deleteAlumno: async (_, { id }) => await Alumno.findByIdAndDelete(id),
    }
};

module.exports = resolvers;
