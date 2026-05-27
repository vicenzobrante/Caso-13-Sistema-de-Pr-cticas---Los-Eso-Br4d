const mongoose = require("mongoose");
const Documento = require("../models/Documento")

const InformePracticaSchema = new mongoose.Schema({
  estado: { type: Boolean, default: false },
  observaciones: { type: String, default: '' },
}, { timestamps: true });

module.exports = Documento.discriminator("InformePractica",InformePracticaSchema);