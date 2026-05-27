const mongoose = require("mongoose");

const DocumentoApoyoSchema = new mongoose.Schema({
  documentoId: { type: mongoose.Schema.Types.ObjectId, required: true },
  nombre: { type: String, required: true, trim: true },
}, { timestamps: true });

module.exports = mongoose.model("DocumentoApoyo", DocumentoApoyoSchema);