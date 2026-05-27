const router = require('express').Router();

const empleadorController =
    require('../controllers/empleadorController');

const authMiddleware =
    require('../middlewares/authMiddleware');

router.get(
    '/',
    //authMiddleware,
    empleadorController.getEmpleadores
);

router.get(
    '/:_id',
    //authMiddleware,
    empleadorController.getEmpleadorById
);

router.post(
    '/',
    //authMiddleware,
    empleadorController.crearEmpleador
);

router.put(
    '/:_id',
    //authMiddleware,
    empleadorController.actualizarEmpleador
);

router.delete(
    '/:_id',
    //authMiddleware,
    empleadorController.eliminarEmpleador
);

module.exports = router;