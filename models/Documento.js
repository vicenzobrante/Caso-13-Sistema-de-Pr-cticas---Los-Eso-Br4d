const mongoose = require('mongoose');

const DocumentoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    fechaSubida: {
        type: Date,
        default: Date.now
    },
    urlArchivo: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Documento', DocumentoSchema);