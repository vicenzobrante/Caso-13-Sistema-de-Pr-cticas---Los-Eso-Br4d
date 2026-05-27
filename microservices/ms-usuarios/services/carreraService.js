const Carrera = require('../models/Carrera');

exports.getCarreras = async () => {

    return await Carrera.find();
};

exports.getCarreraById = async (id) => {

    const carrera = await Carrera.findById(id);

    if (!carrera) {
        throw new Error('Carrera no encontrada');
    }

    return carrera;
};

exports.crearCarrera = async (data) => {

    const nuevaCarrera = new Carrera(data);

    return await nuevaCarrera.save();
};

exports.actualizarCarrera = async (id, data) => {

    const carrera =
        await Carrera.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );

    if (!carrera) {
        throw new Error('Carrera no encontrada');
    }

    return carrera;
};

exports.eliminarCarrera = async (id) => {

    const carrera =
        await Carrera.findByIdAndDelete(id);

    if (!carrera) {
        throw new Error('Carrera no encontrada');
    }

    return carrera;
};