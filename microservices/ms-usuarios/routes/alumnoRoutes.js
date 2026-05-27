const router = require('express').Router();

const alumnoController =
    require('../controllers/alumnoController');

const authMiddleware =
    require('../middlewares/authMiddleware');

router.get(
    '/',
    authMiddleware,
    alumnoController.getAlumnos
);

router.get(
    '/:id',
    authMiddleware,
    alumnoController.getAlumnoById
);

router.post(
    '/',
    authMiddleware,
    alumnoController.crearAlumno
);

router.put(
    '/:id',
    authMiddleware,
    alumnoController.actualizarAlumno
);

router.delete(
    '/:id',
    authMiddleware,
    alumnoController.eliminarAlumno
);

module.exports = router;