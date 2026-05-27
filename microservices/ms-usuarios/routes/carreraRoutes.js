const express = require('express');

const router = express.Router();

const carreraController =
    require('../controllers/carreraController');

router.get(
    '/',
    carreraController.getCarreras
);

router.get(
    '/:id',
    carreraController.getCarreraById
);

router.post(
    '/',
    carreraController.crearCarrera
);

router.put(
    '/:id',
    carreraController.actualizarCarrera
);

router.delete(
    '/:id',
    carreraController.eliminarCarrera
);

module.exports = router;