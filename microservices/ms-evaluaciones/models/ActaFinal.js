const mongoose = require("mongoose");
const Formulario = require("../models/Formulario")

const ActaFinalSchema = new mongoose.Schema({
  acta2Id: { type: mongoose.Schema.Types.ObjectId, required: true },
  evaluacionInformePracticaId: { type: mongoose.Schema.Types.ObjectId, required: true },
  notaPonderada: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = Formulario.discriminator("ActaFinal",ActaFinalSchema);