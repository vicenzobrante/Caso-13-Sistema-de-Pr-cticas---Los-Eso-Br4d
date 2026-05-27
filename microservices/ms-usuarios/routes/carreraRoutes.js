const express = require('express');

const router = express.Router();

const carreraController =
    require('../controllers/carreraController');

router.get(
    '/',
    carreraController.getCarreras
);

router.get(
    '/:_id',
    carreraController.getCarreraById
);

router.post(
    '/',
    carreraController.crearCarrera
);

router.put(
    '/:_id',
    carreraController.actualizarCarrera
);

router.delete(
    '/:_id',
    carreraController.eliminarCarrera
);

module.exports = router;