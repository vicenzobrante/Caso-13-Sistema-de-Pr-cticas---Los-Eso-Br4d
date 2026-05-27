const router = require('express').Router();

const actaFinalController =
    require('../controllers/actaFinalController');

const authMiddleware =
    require('../middlewares/authMiddleware');

router.get(
    '/',
    authMiddleware,
    actaFinalController.getActaFinals
);

router.get(
    '/:_id',
    authMiddleware,
    actaFinalController.getActaFinalById
);

router.post(
    '/',
    authMiddleware,
    actaFinalController.crearActaFinal
);

router.put(
    '/:_id',
    authMiddleware,
    actaFinalController.actualizarActaFinal
);

router.delete(
    '/:_id',
    authMiddleware,
    actaFinalController.eliminarActaFinal
);

module.exports = router;