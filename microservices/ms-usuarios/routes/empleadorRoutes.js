const router = require('express').Router();

const empleadorController =
    require('../controllers/empleadorController');

const authMiddleware =
    require('../middlewares/authMiddleware');

router.get(
    '/',
    authMiddleware,
    empleadorController.getEmpleadores
);

router.get(
    '/:id',
    authMiddleware,
    empleadorController.getEmpleadorById
);

router.post(
    '/',
    authMiddleware,
    empleadorController.crearEmpleador
);

router.put(
    '/:id',
    authMiddleware,
    empleadorController.actualizarEmpleador
);

router.delete(
    '/:id',
    authMiddleware,
    empleadorController.eliminarEmpleador
);

module.exports = router;