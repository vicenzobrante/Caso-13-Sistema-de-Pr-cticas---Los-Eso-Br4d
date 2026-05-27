const Acta1 = require('../models/Acta1');

exports.getActa1s = async () => {

    return await Acta1.find();
};

exports.getActa1ById = async (id) => {

    const acta1 = await Acta1.findById(id);

    if (!acta1) {
        throw new Error('Acta 1 no encontrada');
    }

    return acta1;
};

exports.crearActa1 = async (data) => {

    const nuevoActa1 = new Acta1(data);

    return await nuevoActa1.save();
};

exports.actualizarActa1 = async (id, data) => {

    const acta1 =
        await Acta1.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );

    if (!acta1) {
        throw new Error('Acta 1 no encontrada');
    }

    return acta1;
};

exports.eliminarActa1 = async (id) => {

    const acta1 =
        await Acta1.findByIdAndDelete(id);

    if (!acta1) {
        throw new Error('Acta 1 no encontrada');
    }

    return acta1;
};