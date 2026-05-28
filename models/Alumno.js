const mongoose = require('mongoose');
const Usuario = require('./Usuario');
const AlumnoSchema = new mongoose.Schema({
    matricula: { type: String, required: true, },
    carrera: { type: mongoose.Schema.Types.ObjectId, ref: 'Carrera',},
    semestre: Number,
    sede: { type: mongoose.Schema.Types.ObjectId,ref: 'Sede', },
});
module.exports = Usuario.discriminator(
    'Alumno',
    AlumnoSchema
);