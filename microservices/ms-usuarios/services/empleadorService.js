const Empleador = require('../models/Empleador');
const mongoose = require('mongoose')

exports.getEmpleadores = async () => {

    return await Empleador.find();
};

exports.getEmpleadorById = async (id) => {

    const empleador =
        await Empleador.findById(id);

    if (!empleador) {
        throw new Error('Empleador no encontrado');
    }

    return empleador;
};

exports.crearEmpleador = async (data) => {

        const empleadorActualizado = await mongoose.connection.db.collection('usuarios').findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(data.usuarioId) },
            {
                $set: {
                    __t: 'Empleador', 
                    cargo: data.cargo, 
                    empresa: data.empresa        
                }
            },
            { new: true, runValidators: true }
        );
        if (!empleadorActualizado) {
            throw new Error('El usuario base no existe');
        }
    
        
        return await Empleador.findById(empleadorActualizado._id)
            .populate('carrera')
            .populate('sede');
};

exports.actualizarEmpleador = async (id, data) => {

    const empleador =
        await Empleador.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );

    if (!empleador) {
        throw new Error('Empleador no encontrado');
    }

    return empleador;
};

exports.eliminarEmpleador = async (id) => {

    const empleador =
        await Empleador.findByIdAndDelete(id);

    if (!empleador) {
        throw new Error('Empleador no encontrado');
    }

    return empleador;
};