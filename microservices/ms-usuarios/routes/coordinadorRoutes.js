const router = require('express').Router();

const coordinadorController =
    require('../controllers/coordinadorController');

const authMiddleware =
    require('../middlewares/authMiddleware');

router.get(
    '/',
    authMiddleware,
    coordinadorController.getCoordinadores
);

router.get(
    '/:id',
    authMiddleware,
    coordinadorController.getCoordinadorById
);

router.post(
    '/',
    authMiddleware,
    coordinadorController.crearCoordinador
);

router.put(
    '/:id',
    authMiddleware,
    coordinadorController.actualizarCoordinador
);

router.delete(
    '/:id',
    authMiddleware,
    coordinadorController.eliminarCoordinador
);

module.exports = router;