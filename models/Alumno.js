const mongoose = require('mongoose');

const AlumnoSchema = new mongoose.Schema({
    usuario: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
    matricula: String,
    carrera: {type: mongoose.Schema.Types.ObjectId, ref: 'Carrera'},
    semestre: Number,
    sede: {type: mongoose.Schema.Types.ObjectId, ref: 'Sede'},
});

module.exports = mongoose.model('Alumno', AlumnoSchema);