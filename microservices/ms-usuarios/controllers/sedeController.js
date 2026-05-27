const sedeService =
    require('../services/sedeService');

exports.getSedes = async (
    req,
    res,
    next
) => {

    try {

        const sedes =
            await sedeService.getSedes();

        res.status(200).json(sedes);

    } catch (error) {

        next(error);
    }
};

exports.getSedeById = async (
    req,
    res,
    next
) => {

    try {

        const sede =
            await sedeService.getSedeById(
                req.params._id
            );

        res.status(200).json(sede);

    } catch (error) {

        next(error);
    }
};

exports.crearSede = async (
    req,
    res,
    next
) => {

    try {

        const sede =
            await sedeService.crearSede(
                req.body
            );

        res.status(201).json(sede);

    } catch (error) {

        next(error);
    }
};

exports.actualizarSede = async (
    req,
    res,
    next
) => {

    try {

        const sede =
            await sedeService.actualizarSede(
                req.params._id,
                req.body
            );

        res.status(200).json(sede);

    } catch (error) {

        next(error);
    }
};

exports.eliminarSede = async (
    req,
    res,
    next
) => {

    try {

        const sede =
            await sedeService.eliminarSede(
                req.params._id
            );

        res.status(200).json(sede);

    } catch (error) {

        next(error);
    }
};