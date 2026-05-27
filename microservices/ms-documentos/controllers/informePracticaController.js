const informePracticaService = require('../services/informePracticaService');

exports.getInformePracticas = async (req, res, next) => {
    try {

        const informePracticas = await informePracticaService.getInformePracticas();

        res.status(200).json(informePracticas);

    } catch (error) {
        next(error);
    }
};

exports.getInformePracticaById = async (req, res, next) => {
    try {

        const informePractica =
            await informePracticaService.getInformePracticaById(req.params._id);

        res.status(200).json(informePractica);

    } catch (error) {
        next(error);
    }
};

exports.crearInformePractica = async (req, res, next) => {
    try {

        const nuevoInformePractica =
            await informePracticaService.crearInformePractica(req.body);

        res.status(201).json(nuevoInformePractica);

    } catch (error) {
        next(error);
    }
};

exports.actualizarInformePractica = async (req, res, next) => {
    try {

        const informePracticaActualizado =
            await informePracticaService.actualizarInformePractica(
                req.params._id,
                req.body
            );

        res.status(200).json(informePracticaActualizado);

    } catch (error) {
        next(error);
    }
};

exports.eliminarInformePractica = async (req, res, next) => {
    try {

        const resultado =
            await informePracticaService.eliminarInformePractica(req.params._id);

        res.status(200).json(resultado);

    } catch (error) {
        next(error);
    }
};