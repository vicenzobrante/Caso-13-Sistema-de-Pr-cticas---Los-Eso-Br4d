const mongoose = require("mongoose");

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

module.exports = mongoose.model("Practica",PracticaSchema);