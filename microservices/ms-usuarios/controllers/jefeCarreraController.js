const jefeCarreraService =
    require('../services/jefeCarreraService');

exports.getJefesCarrera = async (req, res, next) => {
    try {

        const jefes =
            await jefeCarreraService.getJefesCarrera();

        res.status(200).json(jefes);

    } catch (error) {
        next(error);
    }
};

exports.getJefeCarreraById = async (req, res, next) => {
    try {

        const jefe =
            await jefeCarreraService.getJefeCarreraById(
                req.params.id
            );

        res.status(200).json(jefe);

    } catch (error) {
        next(error);
    }
};

exports.crearJefeCarrera = async (req, res, next) => {
    try {

        const nuevoJefe =
            await jefeCarreraService.crearJefeCarrera(req.body);

        res.status(201).json(nuevoJefe);

    } catch (error) {
        next(error);
    }
};

exports.actualizarJefeCarrera = async (req, res, next) => {
    try {

        const jefeActualizado =
            await jefeCarreraService.actualizarJefeCarrera(
                req.params.id,
                req.body
            );

        res.status(200).json(jefeActualizado);

    } catch (error) {
        next(error);
    }
};

exports.eliminarJefeCarrera = async (req, res, next) => {
    try {

        const resultado =
            await jefeCarreraService.eliminarJefeCarrera(
                req.params.id
            );

        res.status(200).json(resultado);

    } catch (error) {
        next(error);
    }
};