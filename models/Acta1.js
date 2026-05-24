const mongoose = require('mongoose');

const Acta1Schema = new mongoose.Schema({
    formulario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Formulario',
        required: true
    },
    centroDePractica: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CentroPractica',
        required: true
    },
    online: {
        type: Boolean,
        default: false
    },
    tareas: {
        type: String,
        required: true
    },
    fechaTermino: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Acta1', Acta1Schema);