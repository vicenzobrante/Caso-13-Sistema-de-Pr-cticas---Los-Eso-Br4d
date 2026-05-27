const Sede = require('../models/Sede');

exports.getSedes = async () => {

    return await Sede.find();
};

exports.getSedeById = async (id) => {

    const sede = await Sede.findById(id);

    if (!sede) {
        throw new Error('Sede no encontrada');
    }

    return sede;
};

exports.crearSede = async (data) => {

    const nuevaSede = new Sede(data);

    return await nuevaSede.save();
};

exports.actualizarSede = async (id, data) => {

    const sede =
        await Sede.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );

    if (!sede) {
        throw new Error('Sede no encontrada');
    }

    return sede;
};

exports.eliminarSede = async (id) => {

    const sede =
        await Sede.findByIdAndDelete(id);

    if (!sede) {
        throw new Error('Sede no encontrada');
    }

    return sede;
};