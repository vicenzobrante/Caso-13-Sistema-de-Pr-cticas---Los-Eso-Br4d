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
    '/:id',
    authMiddleware,
    evaluacionInformePracticaController.getEvaluacionInformePracticaById
);

router.post(
    '/',
    authMiddleware,
    evaluacionInformePracticaController.crearEvaluacionInformePractica
);

router.put(
    '/:id',
    authMiddleware,
    evaluacionInformePracticaController.actualizarEvaluacionInformePractica
);

router.delete(
    '/:id',
    authMiddleware,
    evaluacionInformePracticaController.eliminarEvaluacionInformePractica
);

module.exports = router;