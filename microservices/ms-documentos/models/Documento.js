const mongoose = require("mongoose");

const DocumentoSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  fechaSubida: { type: Date, default: Date.now },
  urlArchivo: { type: String, required: true, trim: true },
}, { timestamps: true });

module.exports = mongoose.model("Documento", DocumentoSchema);


