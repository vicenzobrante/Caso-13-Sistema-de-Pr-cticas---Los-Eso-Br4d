const mongoose = require("mongoose");
const Formulario = require("../models/Formulario")

const Acta2Schema = new mongoose.Schema({
  criterios: { type: Object, required: true },
  notaPonderada: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = Formulario.discriminator("Acta2",Acta2Schema);