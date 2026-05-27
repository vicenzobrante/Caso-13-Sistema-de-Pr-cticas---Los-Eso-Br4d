const practicaService = require('../services/practicaService');

exports.getPracticas = async (req, res, next) => {
    try {

        const practicas = await practicaService.getPracticas();

        res.status(200).json(practicas);

    } catch (error) {
        next(error);
    }
};

exports.getPracticaById = async (req, res, next) => {
    try {

        const practica =
            await practicaService.getPracticaById(req.params._id);

        res.status(200).json(practica);

    } catch (error) {
        next(error);
    }
};

exports.crearPractica = async (req, res, next) => {
    try {

        const nuevoPractica =
            await practicaService.crearPractica(req.body);

        res.status(201).json(nuevoPractica);

    } catch (error) {
        next(error);
    }
};

exports.actualizarPractica = async (req, res, next) => {
    try {

        const practicaActualizado =
            await practicaService.actualizarPractica(
                req.params._id,
                req.body
            );

        res.status(200).json(practicaActualizado);

    } catch (error) {
        next(error);
    }
};

exports.eliminarPractica = async (req, res, next) => {
    try {

        const resultado =
            await practicaService.eliminarPractica(req.params._id);

        res.status(200).json(resultado);

    } catch (error) {
        next(error);
    }
};