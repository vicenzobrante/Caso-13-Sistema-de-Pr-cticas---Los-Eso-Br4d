const CoordinadorCarrera =
    require('../models/CoordinadorCarrera');

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

    const nuevoCoordinador =
        new CoordinadorCarrera(data);

    return await nuevoCoordinador.save();
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