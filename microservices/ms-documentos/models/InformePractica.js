const mongoose = require("mongoose");

const InformePracticaSchema = new mongoose.Schema({
  documentoId: { type: mongoose.Schema.Types.ObjectId, required: true },
  estado: { type: Boolean, default: false },
  observaciones: { type: String, default: '' },
}, { timestamps: true });

module.exports("InformePractica",InformePracticaSchema);