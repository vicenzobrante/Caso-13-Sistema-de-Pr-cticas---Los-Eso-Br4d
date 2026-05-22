const mongoose = require('mongoose');

const CentroPracticaSchema = new mongoose.Schema({
    idCentro: Number,
    nombreEmpresa: String,
    direccion: String,
    telefono: String,
    rubro: String,
});

module.exports = mongoose.model('CentroPractica', CentroPracticaSchema);