const Practica = require('../models/Practica');

exports.getPracticas = async () => {

    return await Practica.find();
};

exports.getPracticaById = async (id) => {

    const practica = await Practica.findById(id);

    if (!practica) {
        throw new Error('Practica no encontrada');
    }

    return practica;
};

exports.crearPractica = async (data) => {

    const nuevoPractica = new Practica(data);

    return await nuevoPractica.save();
};

exports.actualizarPractica = async (id, data) => {

    const practica =
        await Practica.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );

    if (!practica) {
        throw new Error('Practica no encontrada');
    }

    return practica;
};

exports.eliminarPractica = async (id) => {

    const practica =
        await Practica.findByIdAndDelete(id);

    if (!practica) {
        throw new Error('Practica no encontrada');
    }

    return practica;
};