const coordinadorService =
    require('../services/coordinadorService');

exports.getCoordinadores = async (req, res, next) => {
    try {

        const coordinadores =
            await coordinadorService.getCoordinadores();

        res.status(200).json(coordinadores);

    } catch (error) {
        next(error);
    }
};

exports.getCoordinadorById = async (req, res, next) => {
    try {

        const coordinador =
            await coordinadorService.getCoordinadorById(
                req.params.id
            );

        res.status(200).json(coordinador);

    } catch (error) {
        next(error);
    }
};

exports.crearCoordinador = async (req, res, next) => {
    try {

        const nuevoCoordinador =
            await coordinadorService.crearCoordinador(req.body);

        res.status(201).json(nuevoCoordinador);

    } catch (error) {
        next(error);
    }
};

exports.actualizarCoordinador = async (req, res, next) => {
    try {

        const coordinadorActualizado =
            await coordinadorService.actualizarCoordinador(
                req.params.id,
                req.body
            );

        res.status(200).json(coordinadorActualizado);

    } catch (error) {
        next(error);
    }
};

exports.eliminarCoordinador = async (req, res, next) => {
    try {

        const resultado =
            await coordinadorService.eliminarCoordinador(
                req.params.id
            );

        res.status(200).json(resultado);

    } catch (error) {
        next(error);
    }
};