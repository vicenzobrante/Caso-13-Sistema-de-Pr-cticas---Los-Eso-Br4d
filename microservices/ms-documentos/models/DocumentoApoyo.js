const mongoose = require("mongoose");
const Documento = require("../models/Documento");

const DocumentoApoyoSchema = new mongoose.Schema({
  titulo: { type: String, required: true, trim: true },
}, { timestamps: true });

module.exports = Documento.discriminator("DocumentoApoyo", DocumentoApoyoSchema);