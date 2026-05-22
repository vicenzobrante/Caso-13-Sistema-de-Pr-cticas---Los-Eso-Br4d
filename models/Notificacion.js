const mongoose = require('mongoose');

const NotificacionSchema = new mongoose.Schema({
    idNotificacion: Number,
    usuario: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
    mensaje: String,
    leido: Boolean,
    fechaEnvio: Date,
});

module.exports = mongoose.model('Notificacion', NotificacionSchema);