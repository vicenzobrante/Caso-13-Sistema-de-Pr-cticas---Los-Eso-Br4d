const documentoApoyoService = require('../services/documentoApoyoService');

exports.getDocumentoApoyos = async (req, res, next) => {
    try {

        const documentoApoyos = await documentoApoyoService.getDocumentoApoyos();

        res.status(200).json(documentoApoyos);

    } catch (error) {
        next(error);
    }
};

exports.getDocumentoApoyoById = async (req, res, next) => {
    try {

        const documentoApoyo =
            await documentoApoyoService.getDocumentoApoyoById(req.params._id);

        res.status(200).json(documentoApoyo);

    } catch (error) {
        next(error);
    }
};

exports.crearDocumentoApoyo = async (req, res, next) => {
    try {

        const nuevoDocumentoApoyo =
            await documentoApoyoService.crearDocumentoApoyo(req.body);

        res.status(201).json(nuevoDocumentoApoyo);

    } catch (error) {
        next(error);
    }
};

exports.actualizarDocumentoApoyo = async (req, res, next) => {
    try {

        const documentoApoyoActualizado =
            await documentoApoyoService.actualizarDocumentoApoyo(
                req.params._id,
                req.body
            );

        res.status(200).json(documentoApoyoActualizado);

    } catch (error) {
        next(error);
    }
};

exports.eliminarDocumentoApoyo = async (req, res, next) => {
    try {

        const resultado =
            await documentoApoyoService.eliminarDocumentoApoyo(req.params._id);

        res.status(200).json(resultado);

    } catch (error) {
        next(error);
    }
};