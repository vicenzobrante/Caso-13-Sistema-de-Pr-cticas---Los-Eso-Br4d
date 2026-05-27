const express = require('express');

const router = express.Router();

const sedeController =
    require('../controllers/sedeController');

router.get(
    '/',
    sedeController.getSedes
);

router.get(
    '/:id',
    sedeController.getSedeById
);

router.post(
    '/',
    sedeController.crearSede
);

router.put(
    '/:id',
    sedeController.actualizarSede
);

router.delete(
    '/:id',
    sedeController.eliminarSede
);

module.exports = router;