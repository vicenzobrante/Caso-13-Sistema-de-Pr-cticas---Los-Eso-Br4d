const Acta2 = require('../models/Acta2');

exports.getActa2s = async () => {

    return await Acta2.find();
};

exports.getActa2ById = async (id) => {

    const acta2 = await Acta2.findById(id);

    if (!acta2) {
        throw new Error('Acta 2 no encontrada');
    }

    return acta2;
};

exports.crearActa2 = async (data) => {

    const nuevoActa2 = new Acta2(data);

    return await nuevoActa2.save();
};

exports.actualizarActa2 = async (id, data) => {

    const acta2 =
        await Acta2.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );

    if (!acta2) {
        throw new Error('Acta 2 no encontrada');
    }

    return acta2;
};

exports.eliminarActa2 = async (id) => {

    const acta2 =
        await Acta2.findByIdAndDelete(id);

    if (!acta2) {
        throw new Error('Acta 2 no encontrada');
    }

    return acta2;
};