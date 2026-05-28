const CoordinadorCarrera =
    require('../models/CoordinadorCarrera');
const mongoose = require('mongoose')

exports.getCoordinadores = async () => {

    return await CoordinadorCarrera.find();
};

exports.getCoordinadorById = async (id) => {

    const coordinador =
        await CoordinadorCarrera.findById(id);

    if (!coordinador) {
        throw new Error('Coordinador no encontrado');
    }

    return coordinador;
};

exports.crearCoordinador = async (data) => {


        const coordinadorActualizado = await mongoose.connection.db.collection('usuarios').findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(data.usuarioId) },
            {
                $set: {
                    __t: 'CoordinadorCarrera', 
                    carrera: data.carreraId, 
                    sede: data.sedeId        
                }
            },
            { new: true, runValidators: true }
        );
        if (!coordinadorActualizado) {
            throw new Error('El usuario base no existe');
        }
    
        
        return await CoordinadorCarrera.findById(coordinadorActualizado._id)
            .populate('carrera')
            .populate('sede');

};

exports.actualizarCoordinador = async (id, data) => {

    const coordinador =
        await CoordinadorCarrera.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );

    if (!coordinador) {
        throw new Error('Coordinador no encontrado');
    }

    return coordinador;
};

exports.eliminarCoordinador = async (id) => {

    const coordinador =
        await CoordinadorCarrera.findByIdAndDelete(id);

    if (!coordinador) {
        throw new Error('Coordinador no encontrado');
    }

    return coordinador;
};