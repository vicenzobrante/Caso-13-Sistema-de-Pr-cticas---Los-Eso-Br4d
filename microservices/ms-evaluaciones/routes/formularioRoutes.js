const router = require('express').Router();

const formularioController =
    require('../controllers/formularioController');

const authMiddleware =
    require('../middlewares/authMiddleware');

router.get(
    '/',
    authMiddleware,
    formularioController.getFormularios
);

router.get(
    '/:id',
    authMiddleware,
    formularioController.getFormularioById
);

router.post(
    '/',
    authMiddleware,
    formularioController.crearFormulario
);

router.put(
    '/:id',
    authMiddleware,
    formularioController.actualizarFormulario
);

router.delete(
    '/:id',
    authMiddleware,
    formularioController.eliminarFormulario
);

module.exports = router;