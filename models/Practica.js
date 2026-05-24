const mongoose = require('mongoose');

const PracticaSchema = new mongoose.Schema({
    alumno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alumno',
        required: true
    },
    docente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Docente'
    },
    centro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CentroPractica',
        required: true
    },
    informe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InformePractica'
    },
    fechaInicio: {
        type: Date,
        required: true
    },
    fechaTermino: {
        type: Date,
        required: true
    },
    tipo: {
        type: String,
        enum: ['Laboral', 'Profesional'],
        required: true
    },
    estado: {
        type: String,
        enum: ['Pendiente', 'EnCurso', 'Finalizada', 'Anulada'],
        default: 'Pendiente'
    }
});

module.exports = mongoose.model('Practica', PracticaSchema);