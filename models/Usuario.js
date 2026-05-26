const mongoose = require('mongoose');
const options = {
    discriminatorKey: 'tipoUsuario',
    collection: 'usuarios',
};
const UsuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true, },
    apellido: { type: String, required: true, },
    correo: { type: String, required: true, unique: true, },
    contrasena: {type: String, required: true, },
    telefono: String,
}, options);
module.exports = mongoose.model('Usuario', UsuarioSchema);