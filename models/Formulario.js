const mongoose = require('mongoose');

const FormularioSchema = new mongoose.Schema({
    fecha: {
        type: Date,
        default: Date.now
    },
    estado: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Formulario', FormularioSchema);