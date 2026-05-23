const mongoose = require('mongoose');

const Acta2Schema = new mongoose.Schema({
    formulario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Formulario',
        required: true
    },
    criterios: {
        type: Object,
        required: true
    },
    notaPonderada: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Acta2', Acta2Schema);