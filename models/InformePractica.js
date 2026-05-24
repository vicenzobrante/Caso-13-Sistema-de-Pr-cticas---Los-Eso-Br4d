const mongoose = require('mongoose');

const InformePracticaSchema = new mongoose.Schema({

    documento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Documento',
        required: true
    },
    estado: {
        type: Boolean,
        default: false
    },
    observaciones: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('InformePractica', InformePracticaSchema);