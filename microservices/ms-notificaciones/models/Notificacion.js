const mongoose = require("mongoose");

const NotificacionSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, required: true },
  mensaje: { type: String, required: true, trim: true },
  leido: { type: Boolean, default: false },
  fechaEnvio: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("Notificacion",NotificacionSchema);