const router = require('express').Router();

const usuarioController =
    require('../controllers/usuarioController');

const authMiddleware =
    require('../middlewares/authMiddleware');

router.get(
    '/',
    authMiddleware,
    usuarioController.getUsuarios
);

router.get(
    '/:id',
    authMiddleware,
    usuarioController.getUsuarioById
);

router.post(
    '/',
    usuarioController.crearUsuario
);

router.post(
    '/login',
    usuarioController.loginUsuario
);

router.put(
    '/:id',
    authMiddleware,
    usuarioController.actualizarUsuario
);

router.delete(
    '/:id',
    authMiddleware,
    usuarioController.eliminarUsuario
);

module.exports = router;