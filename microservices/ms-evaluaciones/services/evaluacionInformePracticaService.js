const EvaluacionInformePractica = require('../models/EvaluacionInformePractica');
const mongoose = require("mongoose");
const ActaFinal = require("../models/ActaFinal");

exports.getEvaluacionInformePracticas = async () => {

    return await EvaluacionInformePractica.find();
};

exports.getEvaluacionInformePracticaById = async (id) => {

    const evaluacionInformePractica = await EvaluacionInformePractica.findById(id);

    if (!evaluacionInformePractica) {
        throw new Error('Evaluacion Informe Practica no encontrada');
    }

    return evaluacionInformePractica;
};

exports.crearEvaluacionInformePractica = async (data) => {

    const nuevoEvaluacionInformePractica = await mongoose.connection.db.collection('formularios').findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(data.formularioId) },
        {
            $set: {
                __t: 'Evaluacion_Informe_Practica',
                criterios: data.criterios,
                informePracticaId: data.informePracticaId,
                notaPonderada: data.notaPonderada,
            }
        },
        { new: true, runValidators: true }
    );
    if (!nuevoEvaluacionInformePractica) {
        throw new Error('El usuario base no existe');
    }

    return await EvaluacionInformePractica.findById(nuevoEvaluacionInformePractica._id)
};

exports.actualizarEvaluacionInformePractica = async (id, data) => {

    const evaluacionInformePractica =
        await EvaluacionInformePractica.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );

    if (!evaluacionInformePractica) {
        throw new Error('Evaluacion Informe Practica no encontrada');
    }

    return evaluacionInformePractica;
};

exports.eliminarEvaluacionInformePractica = async (id) => {

    const evaluacionInformePractica =
        await EvaluacionInformePractica.findByIdAndDelete(id);

    if (!evaluacionInformePractica) {
        throw new Error('Evaluacion Informe Practica no encontrada');
    }

    return evaluacionInformePractica;
};