const alumnoService = require('../services/alumnoService');

exports.getAlumnos = async (req, res, next) => {
    try {

        const alumnos = await alumnoService.getAlumnos();

        res.status(200).json(alumnos);

    } catch (error) {
        next(error);
    }
};

exports.getAlumnoById = async (req, res, next) => {
    try {

        const alumno =
            await alumnoService.getAlumnoById(req.params.id);

        res.status(200).json(alumno);

    } catch (error) {
        next(error);
    }
};

exports.crearAlumno = async (req, res, next) => {
    try {

        const nuevoAlumno =
            await alumnoService.crearAlumno(req.body);

        res.status(201).json(nuevoAlumno);

    } catch (error) {
        next(error);
    }
};

exports.actualizarAlumno = async (req, res, next) => {
    try {

        const alumnoActualizado =
            await alumnoService.actualizarAlumno(
                req.params.id,
                req.body
            );

        res.status(200).json(alumnoActualizado);

    } catch (error) {
        next(error);
    }
};

exports.eliminarAlumno = async (req, res, next) => {
    try {

        const resultado =
            await alumnoService.eliminarAlumno(req.params.id);

        res.status(200).json(resultado);

    } catch (error) {
        next(error);
    }
};