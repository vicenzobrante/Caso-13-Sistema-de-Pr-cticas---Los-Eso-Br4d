const mongoose = require('mongoose');

const EvaluacionInformePracticaSchema = new mongoose.Schema({
    formulario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Formulario',
        required: true
    },
    criterios: {
        type: Object,
        required: true
    },
    informePractica: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InformePractica',
        required: true
    },
    notaPonderada: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('EvaluacionInformePractica', EvaluacionInformePracticaSchema);