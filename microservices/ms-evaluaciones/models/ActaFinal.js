const mongoose = require("mongoose");

const ActaFinalSchema = new mongoose.Schema({
  formularioId: { type: mongoose.Schema.Types.ObjectId, required: true },
  acta2Id: { type: mongoose.Schema.Types.ObjectId, required: true },
  evaluacionInformePracticaId: { type: mongoose.Schema.Types.ObjectId, required: true },
  notaPonderada: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("ActaFinal",ActaFinalSchema);