const Docente = require('../models/Docente');
const mongoose = require('mongoose')

exports.getDocentes = async () => {

    return await Docente.find();
};

exports.getDocenteById = async (id) => {

    const docente = await Docente.findById(id);

    if (!docente) {
        throw new Error('Docente no encontrado');
    }

    return docente;
};

exports.crearDocente = async (data) => {

        const docenteActualizado = await mongoose.connection.db.collection('usuarios').findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(data.usuarioId) },
            {
                $set: {
                    __t: 'Docente', 
                    carrera: data.carreraId, 
                    sede: data.sedeId        
                }
            },
            { new: true, runValidators: true }
        );
        if (!docenteActualizado) {
            throw new Error('El usuario base no existe');
        }
    
        
        return await Docente.findById(docenteActualizado._id)
            .populate('carrera')
            .populate('sede');
};

exports.actualizarDocente = async (id, data) => {

    const docente =
        await Docente.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );

    if (!docente) {
        throw new Error('Docente no encontrado');
    }

    return docente;
};

exports.eliminarDocente = async (id) => {

    const docente =
        await Docente.findByIdAndDelete(id);

    if (!docente) {
        throw new Error('Docente no encontrado');
    }

    return docente;
};