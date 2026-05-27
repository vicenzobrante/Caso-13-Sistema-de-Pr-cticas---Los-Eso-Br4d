const acta1Service = require('../services/acta1Service');

exports.getActa1s = async (req, res, next) => {
    try {

        const acta1s = await acta1Service.getActa1s();

        res.status(200).json(acta1s);

    } catch (error) {
        next(error);
    }
};

exports.getActa1ById = async (req, res, next) => {
    try {

        const acta1 =
            await acta1Service.getActa1ById(req.params._id);

        res.status(200).json(acta1);

    } catch (error) {
        next(error);
    }
};

exports.crearActa1 = async (req, res, next) => {
    try {

        const nuevoActa1 =
            await acta1Service.crearActa1(req.body);

        res.status(201).json(nuevoActa1);

    } catch (error) {
        next(error);
    }
};

exports.actualizarActa1 = async (req, res, next) => {
    try {

        const acta1Actualizado =
            await acta1Service.actualizarActa1(
                req.params._id,
                req.body
            );

        res.status(200).json(acta1Actualizado);

    } catch (error) {
        next(error);
    }
};

exports.eliminarActa1 = async (req, res, next) => {
    try {

        const resultado =
            await acta1Service.eliminarActa1(req.params._id);

        res.status(200).json(resultado);

    } catch (error) {
        next(error);
    }
};