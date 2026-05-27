const carreraService =
    require('../services/carreraService');

exports.getCarreras = async (
    req,
    res,
    next
) => {

    try {

        const carreras =
            await carreraService.getCarreras();

        res.status(200).json(carreras);

    } catch (error) {

        next(error);
    }
};

exports.getCarreraById = async (
    req,
    res,
    next
) => {

    try {

        const carrera =
            await carreraService.getCarreraById(
                req.params._id
            );

        res.status(200).json(carrera);

    } catch (error) {

        next(error);
    }
};

exports.crearCarrera = async (
    req,
    res,
    next
) => {

    try {

        const carrera =
            await carreraService.crearCarrera(
                req.body
            );

        res.status(201).json(carrera);

    } catch (error) {

        next(error);
    }
};

exports.actualizarCarrera = async (
    req,
    res,
    next
) => {

    try {

        const carrera =
            await carreraService.actualizarCarrera(
                req.params._id,
                req.body
            );

        res.status(200).json(carrera);

    } catch (error) {

        next(error);
    }
};

exports.eliminarCarrera = async (
    req,
    res,
    next
) => {

    try {

        const carrera =
            await carreraService.eliminarCarrera(
                req.params._id
            );

        res.status(200).json(carrera);

    } catch (error) {

        next(error);
    }
};