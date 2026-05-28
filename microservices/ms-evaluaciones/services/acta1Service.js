const Acta1 = require('../models/Acta1');
const mongoose = require("mongoose");

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

    const nuevoActa1 = await mongoose.connection.db.collection('formularios').findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(data.formularioId) },
        {
            $set: {
                __t: 'Acta_1',
                centroDePractica: data.centroDePractica,
                online: data.online,
                tareas: data.tareas,
                fechaTermino: data.fechaTermino,
            }
        },
        { new: true, runValidators: true }
    );
    if (!nuevoActa1) {
        throw new Error('El usuario base no existe');
    }

    return await Acta1.findById(nuevoActa1._id)
        .populate('centroDePractica')
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