const mongoose = require('mongoose');

// ─── Usuario base ──────────────────────────────────────────────────────────────
// Contiene los datos de autenticación e identidad compartidos por todos los roles.
// Cada rol (Alumno, Docente, etc.) referencia a un Usuario para no duplicar campos.

const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  apellido: { type: String, required: true, trim: true },
  correo: { type: String, required: true, unique: true, lowercase: true, trim: true },
  contrasena: { type: String, required: true },
  telefono: { type: String, trim: true },
}, { timestamps: true });

// ─── Estructura académica ──────────────────────────────────────────────────────

const CarreraSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
}, { timestamps: true });

const SedeSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  ubicacion: { type: String, required: true, trim: true },
}, { timestamps: true });

// ─── Roles de usuario ──────────────────────────────────────────────────────────
// Todos guardan una referencia al usuario base (usuarioId).
// Esto permite que un mismo correo pueda tener distintos roles en el sistema
// sin duplicar la información de login.

const AlumnoSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  matricula: { type: String, required: true, unique: true, trim: true },
  carreraId: { type: mongoose.Schema.Types.ObjectId, ref: 'Carrera', required: true },
  semestre: { type: Number, required: true, min: 1, max: 10 },
  sedeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sede', required: true },
}, { timestamps: true });

const DocenteSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  carreraId: { type: mongoose.Schema.Types.ObjectId, ref: 'Carrera', required: true },
  sedeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sede', required: true },
}, { timestamps: true });

const CoordinadorCarreraSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  carreraId: { type: mongoose.Schema.Types.ObjectId, ref: 'Carrera', required: true },
  sedeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sede', required: true },
}, { timestamps: true });

const JefeCarreraSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  carreraId: { type: mongoose.Schema.Types.ObjectId, ref: 'Carrera', required: true },
  sedeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sede', required: true },
}, { timestamps: true });

// El empleador referencia su empresa, pero el modelo de CentroPractica
// vive en ms-practicas. Acá solo guardamos el ID externo.
const EmpleadorSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  empresaId: { type: mongoose.Schema.Types.ObjectId, required: true },
  cargo: { type: String, trim: true },
}, { timestamps: true });

module.exports = {
  Usuario: mongoose.model('Usuario', UsuarioSchema),
  Carrera: mongoose.model('Carrera', CarreraSchema),
  Sede: mongoose.model('Sede', SedeSchema),
  Alumno: mongoose.model('Alumno', AlumnoSchema),
  Docente: mongoose.model('Docente', DocenteSchema),
  CoordinadorCarrera: mongoose.model('CoordinadorCarrera', CoordinadorCarreraSchema),
  JefeCarrera: mongoose.model('JefeCarrera', JefeCarreraSchema),
  Empleador: mongoose.model('Empleador', EmpleadorSchema),
};
