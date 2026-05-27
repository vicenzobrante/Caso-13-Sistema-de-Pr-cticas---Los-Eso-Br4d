require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// ─── Modelos ───────────────────────────────────────────────────────────────────

// Documento: es la entidad base que representa cualquier archivo subido al sistema.
// Tanto los informes como los documentos de apoyo lo referencian,
// lo que permite reutilizar la lógica de almacenamiento sin duplicar campos.
const DocumentoSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  fechaSubida: { type: Date, default: Date.now },
  urlArchivo: { type: String, required: true, trim: true },
}, { timestamps: true });

// InformePractica: es el informe formal que el alumno entrega al terminar la práctica.
// Envuelve un Documento y agrega campos de revisión (estado y observaciones).
const InformePracticaSchema = new mongoose.Schema({
  documentoId: { type: mongoose.Schema.Types.ObjectId, required: true },
  estado: { type: Boolean, default: false },
  observaciones: { type: String, default: '' },
}, { timestamps: true });

// DocumentoApoyo: material complementario (guías, reglamentos, plantillas).
// También envuelve un Documento pero con un nombre descriptivo propio.
const DocumentoApoyoSchema = new mongoose.Schema({
  documentoId: { type: mongoose.Schema.Types.ObjectId, required: true },
  nombre: { type: String, required: true, trim: true },
}, { timestamps: true });

const Documento = mongoose.model('Documento', DocumentoSchema);
const InformePractica = mongoose.model('InformePractica', InformePracticaSchema);
const DocumentoApoyo = mongoose.model('DocumentoApoyo', DocumentoApoyoSchema);

// ─── Conexión a MongoDB ────────────────────────────────────────────────────────

mongoose.connect(process.env.MONGO_URI_DOCUMENTOS)
  .then(() => console.log('[ms-documentos] Conectado a MongoDB'))
  .catch((err) => console.error('[ms-documentos] Error MongoDB:', err.message));

// ─── Helpers ───────────────────────────────────────────────────────────────────

const handle = (fn) => (req, res) =>
  fn(req, res).catch((err) => {
    console.error('[ms-documentos]', err.message);
    res.status(500).json({ error: err.message });
  });

const notFound = (res, entidad) =>
  res.status(404).json({ error: `${entidad} no encontrado/a` });

// ─── Documentos ───────────────────────────────────────────────────────────────

app.get('/documentos', handle(async (req, res) => {
  res.json(await Documento.find().sort({ fechaSubida: -1 }));
}));

app.get('/documentos/:id', handle(async (req, res) => {
  const doc = await Documento.findById(req.params.id);
  if (!doc) return notFound(res, 'Documento');
  res.json(doc);
}));

app.post('/documentos', handle(async (req, res) => {
  const nuevo = new Documento(req.body);
  await nuevo.save();
  res.status(201).json(nuevo);
}));

app.put('/documentos/:id', handle(async (req, res) => {
  const actualizado = await Documento.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!actualizado) return notFound(res, 'Documento');
  res.json(actualizado);
}));

app.delete('/documentos/:id', handle(async (req, res) => {
  const eliminado = await Documento.findByIdAndDelete(req.params.id);
  if (!eliminado) return notFound(res, 'Documento');
  res.json(eliminado);
}));

// ─── Informes de Práctica ─────────────────────────────────────────────────────

app.get('/informes', handle(async (req, res) => {
  res.json(await InformePractica.find());
}));

app.get('/informes/:id', handle(async (req, res) => {
  const doc = await InformePractica.findById(req.params.id);
  if (!doc) return notFound(res, 'InformePractica');
  res.json(doc);
}));

app.post('/informes', handle(async (req, res) => {
  const nuevo = new InformePractica(req.body);
  await nuevo.save();
  res.status(201).json(nuevo);
}));

app.put('/informes/:id', handle(async (req, res) => {
  const actualizado = await InformePractica.findByIdAndUpdate(
    req.params.id, req.body, { new: true }
  );
  if (!actualizado) return notFound(res, 'InformePractica');
  res.json(actualizado);
}));

app.delete('/informes/:id', handle(async (req, res) => {
  const eliminado = await InformePractica.findByIdAndDelete(req.params.id);
  if (!eliminado) return notFound(res, 'InformePractica');
  res.json(eliminado);
}));

// ─── Documentos de Apoyo ──────────────────────────────────────────────────────

app.get('/apoyo', handle(async (req, res) => {
  res.json(await DocumentoApoyo.find());
}));

app.get('/apoyo/:id', handle(async (req, res) => {
  const doc = await DocumentoApoyo.findById(req.params.id);
  if (!doc) return notFound(res, 'DocumentoApoyo');
  res.json(doc);
}));

app.post('/apoyo', handle(async (req, res) => {
  const nuevo = new DocumentoApoyo(req.body);
  await nuevo.save();
  res.status(201).json(nuevo);
}));

app.put('/apoyo/:id', handle(async (req, res) => {
  const actualizado = await DocumentoApoyo.findByIdAndUpdate(
    req.params.id, req.body, { new: true }
  );
  if (!actualizado) return notFound(res, 'DocumentoApoyo');
  res.json(actualizado);
}));

app.delete('/apoyo/:id', handle(async (req, res) => {
  const eliminado = await DocumentoApoyo.findByIdAndDelete(req.params.id);
  if (!eliminado) return notFound(res, 'DocumentoApoyo');
  res.json(eliminado);
}));

// ─── Arranque ─────────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 4004;
app.listen(PORT, () => {
  console.log(`[ms-documentos] Escuchando en puerto ${PORT}`);
});
