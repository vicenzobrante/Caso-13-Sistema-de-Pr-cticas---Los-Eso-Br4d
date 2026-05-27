const mongoose = require("mongoose");

const Acta2Schema = new mongoose.Schema({
  formularioId: { type: mongoose.Schema.Types.ObjectId, required: true },
  criterios: { type: Object, required: true },
  notaPonderada: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("Acta2",Acta2Schema);