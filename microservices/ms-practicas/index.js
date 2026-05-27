require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// ─── Modelos ───────────────────────────────────────────────────────────────────

// El CentroPractica representa a la empresa donde el alumno realiza su práctica.
// Se gestiona acá porque es parte del flujo operacional de la práctica misma.
const CentroPracticaSchema = new mongoose.Schema({
  nombreEmpresa: { type: String, required: true, trim: true },
  direccion: { type: String, required: true, trim: true },
  telefono: { type: String, trim: true },
  rubro: { type: String, trim: true },
}, { timestamps: true });

// La Practica es la entidad central de este servicio.
// Guarda IDs de entidades de otros servicios (alumnoId, docenteId, centroId, informeId)
// pero no los embebe: el gateway se encarga de resolver esas referencias.
const PracticaSchema = new mongoose.Schema({
  alumnoId: { type: mongoose.Schema.Types.ObjectId, required: true },
  docenteId: { type: mongoose.Schema.Types.ObjectId },
  centroId: { type: mongoose.Schema.Types.ObjectId, required: true },
  informeId: { type: mongoose.Schema.Types.ObjectId },
  fechaInicio: { type: Date, required: true },
  fechaTermino: { type: Date, required: true },
  tipo: {
    type: String,
    enum: ['Laboral', 'Profesional'],
    required: true,
  },
  estado: {
    type: String,
    enum: ['Pendiente', 'EnCurso', 'Finalizada', 'Anulada'],
    default: 'Pendiente',
  },
}, { timestamps: true });

const CentroPractica = mongoose.model('CentroPractica', CentroPracticaSchema);
const Practica = mongoose.model('Practica', PracticaSchema);

// ─── Conexión a MongoDB ────────────────────────────────────────────────────────

mongoose.connect(process.env.MONGO_URI_PRACTICAS)
  .then(() => console.log('[ms-practicas] Conectado a MongoDB'))
  .catch((err) => console.error('[ms-practicas] Error MongoDB:', err.message));

// ─── Helpers ───────────────────────────────────────────────────────────────────

const handle = (fn) => (req, res) =>
  fn(req, res).catch((err) => {
    console.error('[ms-practicas]', err.message);
    res.status(500).json({ error: err.message });
  });

const notFound = (res, entidad) =>
  res.status(404).json({ error: `${entidad} no encontrado/a` });

// ─── Centros de Práctica ──────────────────────────────────────────────────────

app.get('/centros', handle(async (req, res) => {
  res.json(await CentroPractica.find());
}));

app.get('/centros/:id', handle(async (req, res) => {
  const doc = await CentroPractica.findById(req.params.id);
  if (!doc) return notFound(res, 'CentroPractica');
  res.json(doc);
}));

app.post('/centros', handle(async (req, res) => {
  const nuevo = new CentroPractica(req.body);
  await nuevo.save();
  res.status(201).json(nuevo);
}));

app.put('/centros/:id', handle(async (req, res) => {
  const actualizado = await CentroPractica.findByIdAndUpdate(
    req.params.id, req.body, { new: true }
  );
  if (!actualizado) return notFound(res, 'CentroPractica');
  res.json(actualizado);
}));

app.delete('/centros/:id', handle(async (req, res) => {
  const eliminado = await CentroPractica.findByIdAndDelete(req.params.id);
  if (!eliminado) return notFound(res, 'CentroPractica');
  res.json(eliminado);
}));

// ─── Prácticas ────────────────────────────────────────────────────────────────

app.get('/practicas', handle(async (req, res) => {
  // Filtros opcionales por query string: ?alumnoId=xxx o ?estado=EnCurso
  const filtro = {};
  if (req.query.alumnoId) filtro.alumnoId = req.query.alumnoId;
  if (req.query.estado) filtro.estado = req.query.estado;
  res.json(await Practica.find(filtro));
}));

app.get('/practicas/:id', handle(async (req, res) => {
  const doc = await Practica.findById(req.params.id);
  if (!doc) return notFound(res, 'Practica');
  res.json(doc);
}));

app.post('/practicas', handle(async (req, res) => {
  const nueva = new Practica(req.body);
  await nueva.save();
  res.status(201).json(nueva);
}));

app.put('/practicas/:id', handle(async (req, res) => {
  const actualizada = await Practica.findByIdAndUpdate(
    req.params.id, req.body, { new: true }
  );
  if (!actualizada) return notFound(res, 'Practica');
  res.json(actualizada);
}));

app.delete('/practicas/:id', handle(async (req, res) => {
  const eliminada = await Practica.findByIdAndDelete(req.params.id);
  if (!eliminada) return notFound(res, 'Practica');
  res.json(eliminada);
}));

// ─── Arranque ─────────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => {
  console.log(`[ms-practicas] Escuchando en puerto ${PORT}`);
});
