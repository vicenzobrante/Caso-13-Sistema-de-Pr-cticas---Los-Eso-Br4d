const mongoose = require("mongoose")

const EvaluacionInformePracticaSchema = new mongoose.Schema({
  formularioId: { type: mongoose.Schema.Types.ObjectId, required: true },
  criterios: { type: Object, required: true },
  informePracticaId: { type: mongoose.Schema.Types.ObjectId, required: true },
  notaPonderada: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("EvaluacionInformePractica",EvaluacionInformePracticaSchema);