const router = require('express').Router();

const evaluacionInformePracticaController =
    require('../controllers/evaluacionInformePracticaController');

const authMiddleware =
    require('../middlewares/authMiddleware');

router.get(
    '/',
    authMiddleware,
    evaluacionInformePracticaController.getEvaluacionInformePracticas
);

router.get(
    '/:_id',
    authMiddleware,
    evaluacionInformePracticaController.getEvaluacionInformePracticaById
);

router.post(
    '/',
    authMiddleware,
    evaluacionInformePracticaController.crearEvaluacionInformePractica
);

router.put(
    '/:_id',
    authMiddleware,
    evaluacionInformePracticaController.actualizarEvaluacionInformePractica
);

router.delete(
    '/:_id',
    authMiddleware,
    evaluacionInformePracticaController.eliminarEvaluacionInformePractica
);

module.exports = router;