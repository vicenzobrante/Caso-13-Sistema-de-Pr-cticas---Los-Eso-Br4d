const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    id: Number,
    nombre: String,
    apellido: String,
    correo: String,
    contrasena: String,
    telefono: String
});

module.exports = mongoose.model('Usuario', UsuarioSchema);