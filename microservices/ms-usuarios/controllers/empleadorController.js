const empleadorService =
    require('../services/empleadorService');

exports.getEmpleadores = async (req, res, next) => {
    try {

        const empleadores =
            await empleadorService.getEmpleadores();

        res.status(200).json(empleadores);

    } catch (error) {
        next(error);
    }
};

exports.getEmpleadorById = async (req, res, next) => {
    try {

        const empleador =
            await empleadorService.getEmpleadorById(
                req.params.id
            );

        res.status(200).json(empleador);

    } catch (error) {
        next(error);
    }
};

exports.crearEmpleador = async (req, res, next) => {
    try {

        const nuevoEmpleador =
            await empleadorService.crearEmpleador(req.body);

        res.status(201).json(nuevoEmpleador);

    } catch (error) {
        next(error);
    }
};

exports.actualizarEmpleador = async (req, res, next) => {
    try {

        const empleadorActualizado =
            await empleadorService.actualizarEmpleador(
                req.params.id,
                req.body
            );

        res.status(200).json(empleadorActualizado);

    } catch (error) {
        next(error);
    }
};

exports.eliminarEmpleador = async (req, res, next) => {
    try {

        const resultado =
            await empleadorService.eliminarEmpleador(
                req.params.id
            );

        res.status(200).json(resultado);

    } catch (error) {
        next(error);
    }
};