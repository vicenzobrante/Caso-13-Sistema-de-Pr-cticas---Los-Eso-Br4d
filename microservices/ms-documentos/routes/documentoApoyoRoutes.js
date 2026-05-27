const router = require('express').Router();

const documentoApoyoController =
    require('../controllers/documentoApoyoController');

const authMiddleware =
    require('../middlewares/authMiddleware');

router.get(
    '/',
    //authMiddleware,
    documentoApoyoController.getDocumentoApoyos
);

router.get(
    '/:_id',
    //authMiddleware,
    documentoApoyoController.getDocumentoApoyoById
);

router.post(
    '/',
    //authMiddleware,
    documentoApoyoController.crearDocumentoApoyo
);

router.put(
    '/:_id',
    //authMiddleware,
    documentoApoyoController.actualizarDocumentoApoyo
);

router.delete(
    '/:_id',
    //authMiddleware,
    documentoApoyoController.eliminarDocumentoApoyo
);

module.exports = router;