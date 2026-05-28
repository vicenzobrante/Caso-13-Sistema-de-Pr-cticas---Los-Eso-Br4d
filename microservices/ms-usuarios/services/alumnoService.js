const Alumno = require('../models/Alumno');
const mongoose = require('mongoose')
exports.getAlumnos = async () => {

    return await Alumno.find();
};

exports.getAlumnoById = async (id) => {

    const alumno = await Alumno.findById(id);

    if (!alumno) {
        throw new Error('Alumno no encontrado');
    }

    return alumno;
};

exports.crearAlumno = async (data) => {

    const alumnoActualizado = await mongoose.connection.db.collection('usuarios').findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(data.usuarioId) },
        {
            $set: {
                __t: 'Alumno', 
                matricula: data.matricula,
                semestre: data.semestre,
                carrera: data.carreraId, 
                sede: data.sedeId        
            }
        },
        { new: true, runValidators: true }
    );
    if (!alumnoActualizado) {
        throw new Error('El usuario base no existe');
    }

    
    return await Alumno.findById(alumnoActualizado._id)
        .populate('carrera')
        .populate('sede');
};

exports.actualizarAlumno = async (id, data) => {

    const alumno =
        await Alumno.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );

    if (!alumno) {
        throw new Error('Alumno no encontrado');
    }

    return alumno;
};

exports.eliminarAlumno = async (id) => {

    const alumno =
        await Alumno.findByIdAndDelete(id);

    if (!alumno) {
        throw new Error('Alumno no encontrado');
    }

    return alumno;
};