const mongoose = require('mongoose');

const CoordinadorCarreraSchema = new mongoose.Schema({
    usuario: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
    carrera: {type: mongoose.Schema.Types.ObjectId, ref: 'Carrera'},
    sede: {type: mongoose.Schema.Types.ObjectId, ref: 'Sede'},
});

module.exports = mongoose.model('CoordinadorCarrera', CoordinadorCarreraSchema);