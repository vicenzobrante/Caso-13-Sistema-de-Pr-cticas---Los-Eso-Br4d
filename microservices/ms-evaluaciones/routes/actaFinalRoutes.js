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
    '/:id',
    authMiddleware,
    actaFinalController.getActaFinalById
);

router.post(
    '/',
    authMiddleware,
    actaFinalController.crearActaFinal
);

router.put(
    '/:id',
    authMiddleware,
    actaFinalController.actualizarActaFinal
);

router.delete(
    '/:id',
    authMiddleware,
    actaFinalController.eliminarActaFinal
);

module.exports = router;