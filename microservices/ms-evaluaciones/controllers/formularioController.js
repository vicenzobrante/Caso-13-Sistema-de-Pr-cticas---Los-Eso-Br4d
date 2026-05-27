const formularioService = require('../services/formularioService');

exports.getFormularios = async (req, res, next) => {
    try {

        const formularios = await formularioService.getFormularios();

        res.status(200).json(formularios);

    } catch (error) {
        next(error);
    }
};

exports.getFormularioById = async (req, res, next) => {
    try {

        const formulario =
            await formularioService.getFormularioById(req.params._id);

        res.status(200).json(formulario);

    } catch (error) {
        next(error);
    }
};

exports.crearFormulario = async (req, res, next) => {
    try {

        const nuevoFormulario =
            await formularioService.crearFormulario(req.body);

        res.status(201).json(nuevoFormulario);

    } catch (error) {
        next(error);
    }
};

exports.actualizarFormulario = async (req, res, next) => {
    try {

        const formularioActualizado =
            await formularioService.actualizarFormulario(
                req.params._id,
                req.body
            );

        res.status(200).json(formularioActualizado);

    } catch (error) {
        next(error);
    }
};

exports.eliminarFormulario = async (req, res, next) => {
    try {

        const resultado =
            await formularioService.eliminarFormulario(req.params._id);

        res.status(200).json(resultado);

    } catch (error) {
        next(error);
    }
};