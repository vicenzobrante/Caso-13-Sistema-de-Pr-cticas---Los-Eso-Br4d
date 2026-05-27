const mongoose = require("mongoose")
const Formulario = require("../models/Formulario")

const EvaluacionInformePracticaSchema = new mongoose.Schema({
  criterios: { type: Object, required: true },
  informePracticaId: { type: mongoose.Schema.Types.ObjectId, required: true },
  notaPonderada: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = Formulario.discriminator("EvaluacionInformePractica",EvaluacionInformePracticaSchema);