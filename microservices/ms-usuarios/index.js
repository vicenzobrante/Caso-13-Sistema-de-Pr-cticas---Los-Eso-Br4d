require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const {
  Usuario, Carrera, Sede,
  Alumno, Docente, CoordinadorCarrera, JefeCarrera, Empleador,
} = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

// ─── Conexión a MongoDB ────────────────────────────────────────────────────────
mongoose.connect(process.env.MONGO_URI_USUARIOS)
  .then(() => console.log('[ms-usuarios] Conectado a MongoDB'))
  .catch((err) => console.error('[ms-usuarios] Error MongoDB:', err.message));

// ─── Helpers ───────────────────────────────────────────────────────────────────

// Manejador de errores genérico para no repetir try/catch en cada ruta
const handle = (fn) => (req, res) =>
  fn(req, res).catch((err) => {
    console.error('[ms-usuarios]', err.message);
    res.status(500).json({ error: err.message });
  });

const notFound = (res, entidad) =>
  res.status(404).json({ error: `${entidad} no encontrado/a` });

// ─── Usuarios ─────────────────────────────────────────────────────────────────

app.get('/usuarios', handle(async (req, res) => {
  const lista = await Usuario.find();
  res.json(lista);
}));

app.get('/usuarios/:id', handle(async (req, res) => {
  const doc = await Usuario.findById(req.params.id);
  if (!doc) return notFound(res, 'Usuario');
  res.json(doc);
}));

app.post('/usuarios', handle(async (req, res) => {
  const nuevo = new Usuario(req.body);
  await nuevo.save();
  res.status(201).json(nuevo);
}));

app.put('/usuarios/:id', handle(async (req, res) => {
  const actualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!actualizado) return notFound(res, 'Usuario');
  res.json(actualizado);
}));

app.delete('/usuarios/:id', handle(async (req, res) => {
  const eliminado = await Usuario.findByIdAndDelete(req.params.id);
  if (!eliminado) return notFound(res, 'Usuario');
  res.json(eliminado);
}));

// ─── Carreras ─────────────────────────────────────────────────────────────────

app.get('/carreras', handle(async (req, res) => {
  res.json(await Carrera.find());
}));

app.get('/carreras/:id', handle(async (req, res) => {
  const doc = await Carrera.findById(req.params.id);
  if (!doc) return notFound(res, 'Carrera');
  res.json(doc);
}));

app.post('/carreras', handle(async (req, res) => {
  const nueva = new Carrera(req.body);
  await nueva.save();
  res.status(201).json(nueva);
}));

app.put('/carreras/:id', handle(async (req, res) => {
  const actualizada = await Carrera.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!actualizada) return notFound(res, 'Carrera');
  res.json(actualizada);
}));

app.delete('/carreras/:id', handle(async (req, res) => {
  const eliminada = await Carrera.findByIdAndDelete(req.params.id);
  if (!eliminada) return notFound(res, 'Carrera');
  res.json(eliminada);
}));

// ─── Sedes ────────────────────────────────────────────────────────────────────

app.get('/sedes', handle(async (req, res) => {
  res.json(await Sede.find());
}));

app.get('/sedes/:id', handle(async (req, res) => {
  const doc = await Sede.findById(req.params.id);
  if (!doc) return notFound(res, 'Sede');
  res.json(doc);
}));

app.post('/sedes', handle(async (req, res) => {
  const nueva = new Sede(req.body);
  await nueva.save();
  res.status(201).json(nueva);
}));

app.put('/sedes/:id', handle(async (req, res) => {
  const actualizada = await Sede.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!actualizada) return notFound(res, 'Sede');
  res.json(actualizada);
}));

app.delete('/sedes/:id', handle(async (req, res) => {
  const eliminada = await Sede.findByIdAndDelete(req.params.id);
  if (!eliminada) return notFound(res, 'Sede');
  res.json(eliminada);
}));

// ─── Alumnos ──────────────────────────────────────────────────────────────────

app.get('/alumnos', handle(async (req, res) => {
  res.json(await Alumno.find());
}));

app.get('/alumnos/:id', handle(async (req, res) => {
  const doc = await Alumno.findById(req.params.id);
  if (!doc) return notFound(res, 'Alumno');
  res.json(doc);
}));

app.post('/alumnos', handle(async (req, res) => {
  const nuevo = new Alumno(req.body);
  await nuevo.save();
  res.status(201).json(nuevo);
}));

app.put('/alumnos/:id', handle(async (req, res) => {
  const actualizado = await Alumno.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!actualizado) return notFound(res, 'Alumno');
  res.json(actualizado);
}));

app.delete('/alumnos/:id', handle(async (req, res) => {
  const eliminado = await Alumno.findByIdAndDelete(req.params.id);
  if (!eliminado) return notFound(res, 'Alumno');
  res.json(eliminado);
}));

// ─── Docentes ─────────────────────────────────────────────────────────────────

app.get('/docentes', handle(async (req, res) => {
  res.json(await Docente.find());
}));

app.get('/docentes/:id', handle(async (req, res) => {
  const doc = await Docente.findById(req.params.id);
  if (!doc) return notFound(res, 'Docente');
  res.json(doc);
}));

app.post('/docentes', handle(async (req, res) => {
  const nuevo = new Docente(req.body);
  await nuevo.save();
  res.status(201).json(nuevo);
}));

app.put('/docentes/:id', handle(async (req, res) => {
  const actualizado = await Docente.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!actualizado) return notFound(res, 'Docente');
  res.json(actualizado);
}));

app.delete('/docentes/:id', handle(async (req, res) => {
  const eliminado = await Docente.findByIdAndDelete(req.params.id);
  if (!eliminado) return notFound(res, 'Docente');
  res.json(eliminado);
}));

// ─── Coordinadores de Carrera ─────────────────────────────────────────────────

app.get('/coordinadores', handle(async (req, res) => {
  res.json(await CoordinadorCarrera.find());
}));

app.get('/coordinadores/:id', handle(async (req, res) => {
  const doc = await CoordinadorCarrera.findById(req.params.id);
  if (!doc) return notFound(res, 'CoordinadorCarrera');
  res.json(doc);
}));

app.post('/coordinadores', handle(async (req, res) => {
  const nuevo = new CoordinadorCarrera(req.body);
  await nuevo.save();
  res.status(201).json(nuevo);
}));

app.put('/coordinadores/:id', handle(async (req, res) => {
  const actualizado = await CoordinadorCarrera.findByIdAndUpdate(
    req.params.id, req.body, { new: true }
  );
  if (!actualizado) return notFound(res, 'CoordinadorCarrera');
  res.json(actualizado);
}));

app.delete('/coordinadores/:id', handle(async (req, res) => {
  const eliminado = await CoordinadorCarrera.findByIdAndDelete(req.params.id);
  if (!eliminado) return notFound(res, 'CoordinadorCarrera');
  res.json(eliminado);
}));

// ─── Jefes de Carrera ─────────────────────────────────────────────────────────

app.get('/jefes', handle(async (req, res) => {
  res.json(await JefeCarrera.find());
}));

app.get('/jefes/:id', handle(async (req, res) => {
  const doc = await JefeCarrera.findById(req.params.id);
  if (!doc) return notFound(res, 'JefeCarrera');
  res.json(doc);
}));

app.post('/jefes', handle(async (req, res) => {
  const nuevo = new JefeCarrera(req.body);
  await nuevo.save();
  res.status(201).json(nuevo);
}));

app.put('/jefes/:id', handle(async (req, res) => {
  const actualizado = await JefeCarrera.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!actualizado) return notFound(res, 'JefeCarrera');
  res.json(actualizado);
}));

app.delete('/jefes/:id', handle(async (req, res) => {
  const eliminado = await JefeCarrera.findByIdAndDelete(req.params.id);
  if (!eliminado) return notFound(res, 'JefeCarrera');
  res.json(eliminado);
}));

// ─── Empleadores ──────────────────────────────────────────────────────────────

app.get('/empleadores', handle(async (req, res) => {
  res.json(await Empleador.find());
}));

app.get('/empleadores/:id', handle(async (req, res) => {
  const doc = await Empleador.findById(req.params.id);
  if (!doc) return notFound(res, 'Empleador');
  res.json(doc);
}));

app.post('/empleadores', handle(async (req, res) => {
  const nuevo = new Empleador(req.body);
  await nuevo.save();
  res.status(201).json(nuevo);
}));

app.put('/empleadores/:id', handle(async (req, res) => {
  const actualizado = await Empleador.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!actualizado) return notFound(res, 'Empleador');
  res.json(actualizado);
}));

app.delete('/empleadores/:id', handle(async (req, res) => {
  const eliminado = await Empleador.findByIdAndDelete(req.params.id);
  if (!eliminado) return notFound(res, 'Empleador');
  res.json(eliminado);
}));

// ─── Arranque ─────────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`[ms-usuarios] Escuchando en puerto ${PORT}`);
});
