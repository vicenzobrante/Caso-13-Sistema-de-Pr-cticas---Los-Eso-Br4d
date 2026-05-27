const router = require('express').Router();

const centroPracticaController =
    require('../controllers/centroPracticaController');

const authMiddleware =
    require('../middlewares/authMiddleware');

router.get(
    '/',
    //authMiddleware,
    centroPracticaController.getCentroPracticas
);

router.get(
    '/:_id',
    //authMiddleware,
    centroPracticaController.getCentroPracticaById
);

router.post(
    '/',
    //authMiddleware,
    centroPracticaController.crearCentroPractica
);

router.put(
    '/:_id',
    //authMiddleware,
    centroPracticaController.actualizarCentroPractica
);

router.delete(
    '/:_id',
    //authMiddleware,
    centroPracticaController.eliminarCentroPractica
);

module.exports = router;