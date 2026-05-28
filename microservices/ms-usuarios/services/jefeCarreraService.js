const JefeCarrera =
    require('../models/JefeCarrera');



const mongoose = require('mongoose');

exports.getJefesCarrera = async () => {

    return await JefeCarrera.find();
};

exports.getJefeCarreraById = async (id) => {

    const jefe =
        await JefeCarrera.findById(id);

    if (!jefe) {
        throw new Error('Jefe de carrera no encontrado');
    }

    return jefe;
};

exports.crearJefeCarrera = async (data) => {

        const jefeCarreraActualizado = await mongoose.connection.db.collection('usuarios').findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(data.usuarioId) },
            {
                $set: {
                    __t: 'JefeCarrera', 
                    carrera: data.carreraId, 
                    sede: data.sedeId        
                }
            },
            { new: true, runValidators: true }
        );
        if (!jefeCarreraActualizado) {
            throw new Error('El usuario base no existe');
        }
    
        
        return await JefeCarrera.findById(jefeCarreraActualizado._id)
            .populate('carrera')
            .populate('sede');
};

exports.actualizarJefeCarrera = async (id, data) => {

    const jefe =
        await JefeCarrera.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );

    if (!jefe) {
        throw new Error('Jefe de carrera no encontrado');
    }

    return jefe;
};

exports.eliminarJefeCarrera = async (id) => {

    const jefe =
        await JefeCarrera.findByIdAndDelete(id);

    if (!jefe) {
        throw new Error('Jefe de carrera no encontrado');
    }

    return jefe;
};