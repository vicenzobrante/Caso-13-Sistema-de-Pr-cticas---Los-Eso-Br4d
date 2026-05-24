const mongoose = require('mongoose');

const DocumentoApoyoSchema = new mongoose.Schema({
    documento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Documento',
        required: true
    },
    nombre: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('DocumentoApoyo', DocumentoApoyoSchema);