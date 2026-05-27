const express = require('express');

const router = express.Router();

const sedeController =
    require('../controllers/sedeController');

router.get(
    '/',
    sedeController.getSedes
);

router.get(
    '/:_id',
    sedeController.getSedeById
);

router.post(
    '/',
    sedeController.crearSede
);

router.put(
    '/:_id',
    sedeController.actualizarSede
);

router.delete(
    '/:_id',
    sedeController.eliminarSede
);

module.exports = router;