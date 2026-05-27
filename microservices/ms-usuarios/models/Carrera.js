const mongoose = require('mongoose');

const CarreraSchema = new mongoose.Schema({
    nombre: String,
});

module.exports = mongoose.model('Carrera', CarreraSchema);