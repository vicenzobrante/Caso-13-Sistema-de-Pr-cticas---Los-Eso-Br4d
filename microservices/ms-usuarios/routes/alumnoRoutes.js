const router = require('express').Router();

const alumnoController =
    require('../controllers/alumnoController');

const authMiddleware =
    require('../middlewares/authMiddleware');

router.get(
    '/',
    //authMiddleware,
    alumnoController.getAlumnos
);

router.get(
    '/:_id',
    //authMiddleware,
    alumnoController.getAlumnoById
);

router.post(
    '/',
    //authMiddleware,
    alumnoController.crearAlumno
);

router.put(
    '/:_id',
    //authMiddleware,
    alumnoController.actualizarAlumno
);

router.delete(
    '/:_id',
    //authMiddleware,
    alumnoController.eliminarAlumno
);

module.exports = router;