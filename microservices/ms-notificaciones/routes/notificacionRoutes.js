const router = require('express').Router();

const notificacionController =
    require('../controllers/notificacionController');

const authMiddleware =
    require('../middlewares/authMiddleware');

router.get(
    '/',
    //authMiddleware,
    notificacionController.getNotificacions
);

router.get(
    '/:_id',
    //authMiddleware,
    notificacionController.getNotificacionById
);

router.post(
    '/',
    //authMiddleware,
    notificacionController.crearNotificacion
);

router.put(
    '/:_id',
    //authMiddleware,
    notificacionController.actualizarNotificacion
);

router.delete(
    '/:_id',
    //authMiddleware,
    notificacionController.eliminarNotificacion
);

module.exports = router;