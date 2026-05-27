const notificacionService = require('../services/notificacionService');

exports.getNotificacions = async (req, res, next) => {
    try {

        const notificacions = await notificacionService.getNotificacions();

        res.status(200).json(notificacions);

    } catch (error) {
        next(error);
    }
};

exports.getNotificacionById = async (req, res, next) => {
    try {

        const notificacion =
            await notificacionService.getNotificacionById(req.params._id);

        res.status(200).json(notificacion);

    } catch (error) {
        next(error);
    }
};

exports.crearNotificacion = async (req, res, next) => {
    try {

        const nuevoNotificacion =
            await notificacionService.crearNotificacion(req.body);

        res.status(201).json(nuevoNotificacion);

    } catch (error) {
        next(error);
    }
};

exports.actualizarNotificacion = async (req, res, next) => {
    try {

        const notificacionActualizado =
            await notificacionService.actualizarNotificacion(
                req.params._id,
                req.body
            );

        res.status(200).json(notificacionActualizado);

    } catch (error) {
        next(error);
    }
};

exports.eliminarNotificacion = async (req, res, next) => {
    try {

        const resultado =
            await notificacionService.eliminarNotificacion(req.params._id);

        res.status(200).json(resultado);

    } catch (error) {
        next(error);
    }
};