const mongoose = require('mongoose');

const ActaFinalSchema = new mongoose.Schema({
    evaluacion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EvaluacionInformePractica',
        required: true
    },
    acta2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Acta2',
        required: true
    },
    notaPonderada: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('ActaFinal', ActaFinalSchema);