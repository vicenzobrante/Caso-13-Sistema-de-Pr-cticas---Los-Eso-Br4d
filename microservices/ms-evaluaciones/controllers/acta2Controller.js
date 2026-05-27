const acta2Service = require('../services/acta2Service');

exports.getActa2s = async (req, res, next) => {
    try {

        const acta2s = await acta2Service.getActa2s();

        res.status(200).json(acta2s);

    } catch (error) {
        next(error);
    }
};

exports.getActa2ById = async (req, res, next) => {
    try {

        const acta2 =
            await acta2Service.getActa2ById(req.params.id);

        res.status(200).json(acta2);

    } catch (error) {
        next(error);
    }
};

exports.crearActa2 = async (req, res, next) => {
    try {

        const nuevoActa2 =
            await acta2Service.crearActa2(req.body);

        res.status(201).json(nuevoActa2);

    } catch (error) {
        next(error);
    }
};

exports.actualizarActa2 = async (req, res, next) => {
    try {

        const acta2Actualizado =
            await acta2Service.actualizarActa2(
                req.params.id,
                req.body
            );

        res.status(200).json(acta2Actualizado);

    } catch (error) {
        next(error);
    }
};

exports.eliminarActa2 = async (req, res, next) => {
    try {

        const resultado =
            await acta2Service.eliminarActa2(req.params.id);

        res.status(200).json(resultado);

    } catch (error) {
        next(error);
    }
};