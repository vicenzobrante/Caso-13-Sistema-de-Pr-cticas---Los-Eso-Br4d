const usuarioService = require('../services/usuarioService');

exports.getUsuarios = async (req, res, next) => {
    try {

        const usuarios = await usuarioService.getUsuarios();

        res.status(200).json(usuarios);

    } catch (error) {
        next(error);
    }
};

exports.getUsuarioById = async (req, res, next) => {
    try {

        const usuario = await usuarioService.getUsuarioById(req.params.id);

        res.status(200).json(usuario);

    } catch (error) {
        next(error);
    }
};

exports.crearUsuario = async (req, res, next) => {
    try {

        const nuevoUsuario = await usuarioService.crearUsuario(req.body);

        res.status(201).json(nuevoUsuario);

    } catch (error) {
        next(error);
    }
};

exports.loginUsuario = async (req, res, next) => {
    try {

        const resultado = await usuarioService.loginUsuario(req.body);

        res.status(200).json(resultado);

    } catch (error) {
        next(error);
    }
};

exports.actualizarUsuario = async (req, res, next) => {
    try {

        const usuarioActualizado =
            await usuarioService.actualizarUsuario(
                req.params.id,
                req.body
            );

        res.status(200).json(usuarioActualizado);

    } catch (error) {
        next(error);
    }
};

exports.eliminarUsuario = async (req, res, next) => {
    try {

        const resultado =
            await usuarioService.eliminarUsuario(req.params.id);

        res.status(200).json(resultado);

    } catch (error) {
        next(error);
    }
};