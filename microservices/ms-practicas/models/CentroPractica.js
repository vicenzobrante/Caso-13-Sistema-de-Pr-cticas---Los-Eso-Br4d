const mongoose = require("mongoose");

const CentroPracticaSchema = new mongoose.Schema({
  nombreEmpresa: { type: String, required: true, trim: true },
  direccion: { type: String, required: true, trim: true },
  telefono: { type: String, trim: true },
  rubro: { type: String, trim: true },
}, { timestamps: true });

module.exports = mongoose.model("CentroPractica", CentroPracticaSchema);