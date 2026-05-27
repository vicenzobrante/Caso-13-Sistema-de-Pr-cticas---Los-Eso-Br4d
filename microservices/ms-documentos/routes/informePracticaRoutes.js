const router = require('express').Router();

const informePracticaController =
    require('../controllers/informePracticaController');

const authMiddleware =
    require('../middlewares/authMiddleware');

router.get(
    '/',
    //authMiddleware,
    informePracticaController.getInformePracticas
);

router.get(
    '/:_id',
    //authMiddleware,
    informePracticaController.getInformePracticaById
);

router.post(
    '/',
    //authMiddleware,
    informePracticaController.crearInformePractica
);

router.put(
    '/:_id',
    //authMiddleware,
    informePracticaController.actualizarInformePractica
);

router.delete(
    '/:_id',
    //authMiddleware,
    informePracticaController.eliminarInformePractica
);

module.exports = router;