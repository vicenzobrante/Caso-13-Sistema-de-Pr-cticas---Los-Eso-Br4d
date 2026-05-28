const mongoose = require('mongoose');
const Usuario = require('./Usuario');
const EmpleadorSchema = new mongoose.Schema({
    empresa: String, 
    cargo: String,
});
module.exports = Usuario.discriminator(
    'Empleador',
    EmpleadorSchema
);