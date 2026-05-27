const Docente = require('../models/Docente');

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

    const nuevoDocente = new Docente(data);

    return await nuevoDocente.save();
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