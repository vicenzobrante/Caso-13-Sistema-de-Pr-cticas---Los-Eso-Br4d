const router = require('express').Router();

const docenteController =
    require('../controllers/docenteController');

const authMiddleware =
    require('../middlewares/authMiddleware');

router.get(
    '/',
    authMiddleware,
    docenteController.getDocentes
);

router.get(
    '/:id',
    authMiddleware,
    docenteController.getDocenteById
);

router.post(
    '/',
    authMiddleware,
    docenteController.crearDocente
);

router.put(
    '/:id',
    authMiddleware,
    docenteController.actualizarDocente
);

router.delete(
    '/:id',
    authMiddleware,
    docenteController.eliminarDocente
);

module.exports = router;