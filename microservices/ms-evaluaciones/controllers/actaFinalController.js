const actaFinalService = require('../services/actaFinalService');

exports.getActaFinals = async (req, res, next) => {
    try {

        const actaFinals = await actaFinalService.getActaFinals();

        res.status(200).json(actaFinals);

    } catch (error) {
        next(error);
    }
};

exports.getActaFinalById = async (req, res, next) => {
    try {

        const actaFinal =
            await actaFinalService.getActaFinalById(req.params._id);

        res.status(200).json(actaFinal);

    } catch (error) {
        next(error);
    }
};

exports.crearActaFinal = async (req, res, next) => {
    try {

        const nuevoActaFinal =
            await actaFinalService.crearActaFinal(req.body);

        res.status(201).json(nuevoActaFinal);

    } catch (error) {
        next(error);
    }
};

exports.actualizarActaFinal = async (req, res, next) => {
    try {

        const actaFinalActualizado =
            await actaFinalService.actualizarActaFinal(
                req.params._id,
                req.body
            );

        res.status(200).json(actaFinalActualizado);

    } catch (error) {
        next(error);
    }
};

exports.eliminarActaFinal = async (req, res, next) => {
    try {

        const resultado =
            await actaFinalService.eliminarActaFinal(req.params._id);

        res.status(200).json(resultado);

    } catch (error) {
        next(error);
    }
};