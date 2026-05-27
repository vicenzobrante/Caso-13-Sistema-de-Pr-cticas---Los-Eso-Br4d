const mongoose = require("mongoose");
const Formulario = require("../models/Formulario")

const Acta1Schema = new mongoose.Schema({
  centroDePracticaId: { type: mongoose.Schema.Types.ObjectId, required: true },
  online: { type: Boolean, default: false },
  tareas: { type: String, required: true },
  fechaTermino: { type: Date, required: true },
}, { timestamps: true });

module.exports = Formulario.discriminator("Acta1",Acta1Schema);