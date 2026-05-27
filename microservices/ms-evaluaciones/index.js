require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// ─── Modelos ───────────────────────────────────────────────────────────────────

// Formulario: registro base que acompaña a cada acta o evaluación.
// Separarlo evita duplicar campos de fecha/estado en cada entidad de evaluación.
const FormularioSchema = new mongoose.Schema({
  fecha: { type: Date, default: Date.now },
  estado: { type: Boolean, default: false },
}, { timestamps: true });

// Acta1: se llena al inicio de la práctica. Registra las condiciones y tareas.
const Acta1Schema = new mongoose.Schema({
  formularioId: { type: mongoose.Schema.Types.ObjectId, required: true },
  centroDePracticaId: { type: mongoose.Schema.Types.ObjectId, required: true },
  online: { type: Boolean, default: false },
  tareas: { type: String, required: true },
  fechaTermino: { type: Date, required: true },
}, { timestamps: true });

// Acta2: evaluación del empleador sobre el desempeño del alumno.
// Los criterios se guardan como Object para que el sistema sea flexible
// ante cambios en la rúbrica sin necesidad de migrar el esquema.
const Acta2Schema = new mongoose.Schema({
  formularioId: { type: mongoose.Schema.Types.ObjectId, required: true },
  criterios: { type: Object, required: true },
  notaPonderada: { type: Number, default: 0 },
}, { timestamps: true });

// EvaluacionInformePractica: revisión del informe entregado por el alumno.
const EvaluacionInformePracticaSchema = new mongoose.Schema({
  formularioId: { type: mongoose.Schema.Types.ObjectId, required: true },
  criterios: { type: Object, required: true },
  informePracticaId: { type: mongoose.Schema.Types.ObjectId, required: true },
  notaPonderada: { type: Number, default: 0 },
}, { timestamps: true });

// ActaFinal: consolida las notas del acta2 y la evaluación del informe.
const ActaFinalSchema = new mongoose.Schema({
  formularioId: { type: mongoose.Schema.Types.ObjectId, required: true },
  acta2Id: { type: mongoose.Schema.Types.ObjectId, required: true },
  evaluacionInformePracticaId: { type: mongoose.Schema.Types.ObjectId, required: true },
  notaPonderada: { type: Number, default: 0 },
}, { timestamps: true });

const Formulario = mongoose.model('Formulario', FormularioSchema);
const Acta1 = mongoose.model('Acta1', Acta1Schema);
const Acta2 = mongoose.model('Acta2', Acta2Schema);
const EvaluacionInformePractica = mongoose.model('EvaluacionInformePractica', EvaluacionInformePracticaSchema);
const ActaFinal = mongoose.model('ActaFinal', ActaFinalSchema);

// ─── Conexión a MongoDB ────────────────────────────────────────────────────────

mongoose.connect(process.env.MONGO_URI_EVALUACIONES)
  .then(() => console.log('[ms-evaluaciones] Conectado a MongoDB'))
  .catch((err) => console.error('[ms-evaluaciones] Error MongoDB:', err.message));

// ─── Helpers ───────────────────────────────────────────────────────────────────

const handle = (fn) => (req, res) =>
  fn(req, res).catch((err) => {
    console.error('[ms-evaluaciones]', err.message);
    res.status(500).json({ error: err.message });
  });

const notFound = (res, entidad) =>
  res.status(404).json({ error: `${entidad} no encontrado/a` });

// Función genérica de CRUD para no repetir el mismo patrón 5 veces
function crudRoutes(router, path, Model, nombre) {
  router.get(`/${path}`, handle(async (req, res) => {
    res.json(await Model.find());
  }));

  router.get(`/${path}/:id`, handle(async (req, res) => {
    const doc = await Model.findById(req.params.id);
    if (!doc) return notFound(res, nombre);
    res.json(doc);
  }));

  router.post(`/${path}`, handle(async (req, res) => {
    const nuevo = new Model(req.body);
    await nuevo.save();
    res.status(201).json(nuevo);
  }));

  router.put(`/${path}/:id`, handle(async (req, res) => {
    const actualizado = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizado) return notFound(res, nombre);
    res.json(actualizado);
  }));

  router.delete(`/${path}/:id`, handle(async (req, res) => {
    const eliminado = await Model.findByIdAndDelete(req.params.id);
    if (!eliminado) return notFound(res, nombre);
    res.json(eliminado);
  }));
}

// ─── Rutas ────────────────────────────────────────────────────────────────────

crudRoutes(app, 'formularios', Formulario, 'Formulario');
crudRoutes(app, 'actas1', Acta1, 'Acta1');
crudRoutes(app, 'actas2', Acta2, 'Acta2');
crudRoutes(app, 'evaluaciones', EvaluacionInformePractica, 'EvaluacionInformePractica');
crudRoutes(app, 'actasfinal', ActaFinal, 'ActaFinal');

// ─── Arranque ─────────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 4003;
app.listen(PORT, () => {
  console.log(`[ms-evaluaciones] Escuchando en puerto ${PORT}`);
});
