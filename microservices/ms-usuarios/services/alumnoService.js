const Alumno = require('../models/Alumno');
const Usuario = require('../models/Usuario');
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

    const usuarioBase = await Usuario.findById(data.usuarioId);
    
    if (!usuarioBase) {
        throw new Error('El usuario base no existe');
    }

    const datosCompletos = {
        nombre: usuarioBase.nombre,
        apellido: usuarioBase.apellido,
        correo: usuarioBase.correo,
        contrasena: usuarioBase.contrasena, 
        matricula: data.matricula,
        semestre: data.semestre,
        carreraId: data.carreraId,
        sedeId: data.sedeId
    };

    const nuevoAlumno = new Alumno(datosCompletos);

    return await nuevoAlumno.save();
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