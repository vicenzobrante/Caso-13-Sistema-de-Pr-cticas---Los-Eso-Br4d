const mongoose = require("mongoose");

const Acta1Schema = new mongoose.Schema({
  formularioId: { type: mongoose.Schema.Types.ObjectId, required: true },
  centroDePracticaId: { type: mongoose.Schema.Types.ObjectId, required: true },
  online: { type: Boolean, default: false },
  tareas: { type: String, required: true },
  fechaTermino: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Acta1",Acta1Schema);