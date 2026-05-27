const Alumno = require('../models/Alumno');

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

    const nuevoAlumno = new Alumno(data);

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