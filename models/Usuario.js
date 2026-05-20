const moongoose = require('mongoose');

const UsuarioSchema = new moongoose.Schema({
  id: Number,
  nombre: String,
  apellido: String,
  correo: String,
  contrasena: String,
  telefono: String
});

module.exports = moongoose.model('Usuario', UsuarioSchema);