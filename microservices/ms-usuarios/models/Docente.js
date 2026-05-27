const mongoose = require('mongoose');
const Usuario = require('./Usuario');
const DocenteSchema = new mongoose.Schema({
    carrera: { type: mongoose.Schema.Types.ObjectId, ref: 'Carrera', },
    sede: { type: mongoose.Schema.Types.ObjectId, ref: 'Sede', },
});
module.exports = Usuario.discriminator(
    'Docente',
    DocenteSchema
);