require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// ─── Modelo ────────────────────────────────────────────────────────────────────

// Las notificaciones solo guardan el usuarioId (ID externo de ms-usuarios).
// Esto mantiene el bajo acoplamiento: si ms-usuarios cambia su estructura,
// este servicio no necesita actualizarse.
const NotificacionSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, required: true },
  mensaje: { type: String, required: true, trim: true },
  leido: { type: Boolean, default: false },
  fechaEnvio: { type: Date, default: Date.now },
}, { timestamps: true });

// Índice para acelerar la consulta más frecuente (notificaciones de un usuario)
NotificacionSchema.index({ usuarioId: 1, leido: 1 });

const Notificacion = mongoose.model('Notificacion', NotificacionSchema);

// ─── Conexión a MongoDB ────────────────────────────────────────────────────────

mongoose.connect(process.env.MONGO_URI_NOTIFICACIONES)
  .then(() => console.log('[ms-notificaciones] Conectado a MongoDB'))
  .catch((err) => console.error('[ms-notificaciones] Error MongoDB:', err.message));

// ─── Helpers ───────────────────────────────────────────────────────────────────

const handle = (fn) => (req, res) =>
  fn(req, res).catch((err) => {
    console.error('[ms-notificaciones]', err.message);
    res.status(500).json({ error: err.message });
  });

const notFound = (res) =>
  res.status(404).json({ error: 'Notificacion no encontrada' });

// ─── Rutas ────────────────────────────────────────────────────────────────────

app.get('/notificaciones', handle(async (req, res) => {
  res.json(await Notificacion.find().sort({ fechaEnvio: -1 }));
}));

// Consultar notificaciones de un usuario específico (ruta más usada en el frontend)
app.get('/notificaciones/usuario/:usuarioId', handle(async (req, res) => {
  const lista = await Notificacion
    .find({ usuarioId: req.params.usuarioId })
    .sort({ fechaEnvio: -1 });
  res.json(lista);
}));

app.get('/notificaciones/:id', handle(async (req, res) => {
  const doc = await Notificacion.findById(req.params.id);
  if (!doc) return notFound(res);
  res.json(doc);
}));

app.post('/notificaciones', handle(async (req, res) => {
  const nueva = new Notificacion(req.body);
  await nueva.save();
  res.status(201).json(nueva);
}));

app.put('/notificaciones/:id', handle(async (req, res) => {
  const actualizada = await Notificacion.findByIdAndUpdate(
    req.params.id, req.body, { new: true }
  );
  if (!actualizada) return notFound(res);
  res.json(actualizada);
}));

app.delete('/notificaciones/:id', handle(async (req, res) => {
  const eliminada = await Notificacion.findByIdAndDelete(req.params.id);
  if (!eliminada) return notFound(res);
  res.json(eliminada);
}));

// ─── Arranque ─────────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 4005;
app.listen(PORT, () => {
  console.log(`[ms-notificaciones] Escuchando en puerto ${PORT}`);
});
