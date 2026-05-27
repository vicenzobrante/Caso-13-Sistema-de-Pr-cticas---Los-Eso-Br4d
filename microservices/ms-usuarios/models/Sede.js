const mongoose = require('mongoose');
const SedeSchema = new mongoose.Schema({
    nombre: String,
    ubicacion: String,
});

module.exports = mongoose.model('Sede', SedeSchema);