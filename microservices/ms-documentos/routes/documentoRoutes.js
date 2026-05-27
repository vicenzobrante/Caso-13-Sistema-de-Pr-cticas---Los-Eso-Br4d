const router = require('express').Router();

const documentoController =
    require('../controllers/documentoController');

const authMiddleware =
    require('../middlewares/authMiddleware');

router.get(
    '/',
    //authMiddleware,
    documentoController.getDocumentos
);

router.get(
    '/:_id',
    //authMiddleware,
    documentoController.getDocumentoById
);

router.post(
    '/',
    //authMiddleware,
    documentoController.crearDocumento
);

router.put(
    '/:_id',
    //authMiddleware,
    documentoController.actualizarDocumento
);

router.delete(
    '/:_id',
    //authMiddleware,
    documentoController.eliminarDocumento
);

module.exports = router;