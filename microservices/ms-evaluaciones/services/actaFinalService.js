const ActaFinal = require('../models/ActaFinal');
const mongoose = require("mongoose");
const Acta1 = require("../models/Acta1");

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

    const nuevoActaFinal = await mongoose.connection.db.collection('formularios').findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(data.formularioId) },
        {
            $set: {
                __t: 'Acta_Final',
                acta2Id: data.acta2Id,
                evaluacionInformePracticaId: data.evaluacionInformePracticaId,
                notaPonderada: data.notaPonderada,
            }
        },
        { new: true, runValidators: true }
    );
    if (!nuevoActaFinal) {
        throw new Error('El usuario base no existe');
    }

    return await ActaFinal.findById(nuevoActaFinal._id)
        .populate('centroDePractica')
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