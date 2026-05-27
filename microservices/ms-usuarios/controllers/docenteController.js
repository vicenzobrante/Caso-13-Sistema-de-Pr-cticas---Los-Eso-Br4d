const docenteService = require('../services/docenteService');

exports.getDocentes = async (req, res, next) => {
    try {

        const docentes = await docenteService.getDocentes();

        res.status(200).json(docentes);

    } catch (error) {
        next(error);
    }
};

exports.getDocenteById = async (req, res, next) => {
    try {

        const docente =
            await docenteService.getDocenteById(req.params._id);

        res.status(200).json(docente);

    } catch (error) {
        next(error);
    }
};

exports.crearDocente = async (req, res, next) => {
    try {

        const nuevoDocente =
            await docenteService.crearDocente(req.body);

        res.status(201).json(nuevoDocente);

    } catch (error) {
        next(error);
    }
};

exports.actualizarDocente = async (req, res, next) => {
    try {

        const docenteActualizado =
            await docenteService.actualizarDocente(
                req.params._id,
                req.body
            );

        res.status(200).json(docenteActualizado);

    } catch (error) {
        next(error);
    }
};

exports.eliminarDocente = async (req, res, next) => {
    try {

        const resultado =
            await docenteService.eliminarDocente(req.params._id);

        res.status(200).json(resultado);

    } catch (error) {
        next(error);
    }
};