const router = require('express').Router();

const practicaController =
    require('../controllers/practicaController');

const authMiddleware =
    require('../middlewares/authMiddleware');

router.get(
    '/',
    //authMiddleware,
    practicaController.getPracticas
);

router.get(
    '/:_id',
    //authMiddleware,
    practicaController.getPracticaById
);

router.post(
    '/',
    //authMiddleware,
    practicaController.crearPractica
);

router.put(
    '/:_id',
    //authMiddleware,
    practicaController.actualizarPractica
);

router.delete(
    '/:_id',
    //authMiddleware,
    practicaController.eliminarPractica
);

module.exports = router;