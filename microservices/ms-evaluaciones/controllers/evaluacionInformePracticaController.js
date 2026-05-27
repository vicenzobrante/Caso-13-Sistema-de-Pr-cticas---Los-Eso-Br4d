const evaluacionInformePracticaService = require('../services/evaluacionInformePracticaService');

exports.getEvaluacionInformePracticas = async (req, res, next) => {
    try {

        const evaluacionInformePracticas = await evaluacionInformePracticaService.getEvaluacionInformePracticas();

        res.status(200).json(evaluacionInformePracticas);

    } catch (error) {
        next(error);
    }
};

exports.getEvaluacionInformePracticaById = async (req, res, next) => {
    try {

        const evaluacionInformePractica =
            await evaluacionInformePracticaService.getEvaluacionInformePracticaById(req.params._id);

        res.status(200).json(evaluacionInformePractica);

    } catch (error) {
        next(error);
    }
};

exports.crearEvaluacionInformePractica = async (req, res, next) => {
    try {

        const nuevoEvaluacionInformePractica =
            await evaluacionInformePracticaService.crearEvaluacionInformePractica(req.body);

        res.status(201).json(nuevoEvaluacionInformePractica);

    } catch (error) {
        next(error);
    }
};

exports.actualizarEvaluacionInformePractica = async (req, res, next) => {
    try {

        const evaluacionInformePracticaActualizado =
            await evaluacionInformePracticaService.actualizarEvaluacionInformePractica(
                req.params._id,
                req.body
            );

        res.status(200).json(evaluacionInformePracticaActualizado);

    } catch (error) {
        next(error);
    }
};

exports.eliminarEvaluacionInformePractica = async (req, res, next) => {
    try {

        const resultado =
            await evaluacionInformePracticaService.eliminarEvaluacionInformePractica(req.params._id);

        res.status(200).json(resultado);

    } catch (error) {
        next(error);
    }
};