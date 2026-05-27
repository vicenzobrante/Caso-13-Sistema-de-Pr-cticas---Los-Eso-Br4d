const EvaluacionInformePractica = require('../models/EvaluacionInformePractica');

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

    const nuevoEvaluacionInformePractica = new EvaluacionInformePractica(data);

    return await nuevoEvaluacionInformePractica.save();
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