const centroPracticaService = require('../services/centroPracticaService');

exports.getCentroPracticas = async (req, res, next) => {
    try {

        const centroPracticas = await centroPracticaService.getCentroPracticas();

        res.status(200).json(centroPracticas);

    } catch (error) {
        next(error);
    }
};

exports.getCentroPracticaById = async (req, res, next) => {
    try {

        const centroPractica =
            await centroPracticaService.getCentroPracticaById(req.params._id);

        res.status(200).json(centroPractica);

    } catch (error) {
        next(error);
    }
};

exports.crearCentroPractica = async (req, res, next) => {
    try {

        const nuevoCentroPractica =
            await centroPracticaService.crearCentroPractica(req.body);

        res.status(201).json(nuevoCentroPractica);

    } catch (error) {
        next(error);
    }
};

exports.actualizarCentroPractica = async (req, res, next) => {
    try {

        const centroPracticaActualizado =
            await centroPracticaService.actualizarCentroPractica(
                req.params._id,
                req.body
            );

        res.status(200).json(centroPracticaActualizado);

    } catch (error) {
        next(error);
    }
};

exports.eliminarCentroPractica = async (req, res, next) => {
    try {

        const resultado =
            await centroPracticaService.eliminarCentroPractica(req.params._id);

        res.status(200).json(resultado);

    } catch (error) {
        next(error);
    }
};