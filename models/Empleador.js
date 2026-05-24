const mongoose = require('mongoose');

const EmpleadorSchema = new mongoose.Schema({
    usuario: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
    empresa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CentroPractica',
        required: true
    },
    cargo: String,
});

module.exports = mongoose.model('Empleador', EmpleadorSchema);