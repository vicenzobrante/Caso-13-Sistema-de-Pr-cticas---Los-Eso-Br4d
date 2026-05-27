const router = require('express').Router();

const jefeCarreraController =
    require('../controllers/jefeCarreraController');

const authMiddleware =
    require('../middlewares/authMiddleware');

router.get(
    '/',
    authMiddleware,
    jefeCarreraController.getJefesCarrera
);

router.get(
    '/:id',
    authMiddleware,
    jefeCarreraController.getJefeCarreraById
);

router.post(
    '/',
    authMiddleware,
    jefeCarreraController.crearJefeCarrera
);

router.put(
    '/:id',
    authMiddleware,
    jefeCarreraController.actualizarJefeCarrera
);

router.delete(
    '/:id',
    authMiddleware,
    jefeCarreraController.eliminarJefeCarrera
);

module.exports = router;