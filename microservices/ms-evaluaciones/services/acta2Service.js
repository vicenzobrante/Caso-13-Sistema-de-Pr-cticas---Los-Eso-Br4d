const Acta2 = require('../models/Acta2');
const mongoose = require("mongoose");
const Acta1 = require("../models/Acta1");

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

    const nuevoActa2 = await mongoose.connection.db.collection('formularios').findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(data.formularioId) },
        {
            $set: {
                __t: 'Acta_2',
                criterios: data.criterios,
                notaPonderada: data.notaPonderada,
            }
        },
        { new: true, runValidators: true }
    );
    if (!nuevoActa2) {
        throw new Error('El usuario base no existe');
    }

    return await Acta2.findById(nuevoActa2._id)
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