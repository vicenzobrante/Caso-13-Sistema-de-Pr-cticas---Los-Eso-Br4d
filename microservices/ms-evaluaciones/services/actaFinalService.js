const ActaFinal = require('../models/ActaFinal');

exports.getActaFinals = async () => {

    return await ActaFinal.find();
};

exports.getActaFinalById = async (id) => {

    const actaFinal = await ActaFinal.findById(id);

    if (!actaFinal) {
        throw new Error('Acta Final no encontrada');
    }

    return actaFinal;
};

exports.crearActaFinal = async (data) => {

    const nuevoActaFinal = new ActaFinal(data);

    return await nuevoActaFinal.save();
};

exports.actualizarActaFinal = async (id, data) => {

    const actaFinal =
        await ActaFinal.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );

    if (!actaFinal) {
        throw new Error('Acta Final no encontrada');
    }

    return actaFinal;
};

exports.eliminarActaFinal = async (id) => {

    const actaFinal =
        await ActaFinal.findByIdAndDelete(id);

    if (!actaFinal) {
        throw new Error('Acta Final no encontrada');
    }

    return actaFinal;
};