const mongoose = require('mongoose');

const CarreraSchema = new mongoose.Schema({
    idCarrera: Number,
    nombre: String,
});

module.exports = mongoose.model('Carrera', CarreraSchema);