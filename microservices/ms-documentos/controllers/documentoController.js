const documentoService = require('../services/documentoService');

exports.getDocumentos = async (req, res, next) => {
    try {

        const documentos = await documentoService.getDocumentos();

        res.status(200).json(documentos);

    } catch (error) {
        next(error);
    }
};

exports.getDocumentoById = async (req, res, next) => {
    try {

        const documento =
            await documentoService.getDocumentoById(req.params._id);

        res.status(200).json(documento);

    } catch (error) {
        next(error);
    }
};

exports.crearDocumento = async (req, res, next) => {
    try {

        const nuevoDocumento =
            await documentoService.crearDocumento(req.body);

        res.status(201).json(nuevoDocumento);

    } catch (error) {
        next(error);
    }
};

exports.actualizarDocumento = async (req, res, next) => {
    try {

        const documentoActualizado =
            await documentoService.actualizarDocumento(
                req.params._id,
                req.body
            );

        res.status(200).json(documentoActualizado);

    } catch (error) {
        next(error);
    }
};

exports.eliminarDocumento = async (req, res, next) => {
    try {

        const resultado =
            await documentoService.eliminarDocumento(req.params._id);

        res.status(200).json(resultado);

    } catch (error) {
        next(error);
    }
};