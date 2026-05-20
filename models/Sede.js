const mongoose = require('mongoose');
const SedeSchema = new mongoose.Schema({
    idSede: Number,
    nombre: String,
    ubicacion: Location,
});

module.exports = mongoose.model('Sede', SedeSchema);