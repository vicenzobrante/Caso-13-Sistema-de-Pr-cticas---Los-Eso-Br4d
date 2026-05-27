const router = require('express').Router();

const acta1Controller =
    require('../controllers/acta1Controller');

const authMiddleware =
    require('../middlewares/authMiddleware');

router.get(
    '/',
    authMiddleware,
    acta1Controller.getActa1s
);

router.get(
    '/:id',
    authMiddleware,
    acta1Controller.getActa1ById
);

router.post(
    '/',
    authMiddleware,
    acta1Controller.crearActa1
);

router.put(
    '/:id',
    authMiddleware,
    acta1Controller.actualizarActa1
);

router.delete(
    '/:id',
    authMiddleware,
    acta1Controller.eliminarActa1
);

module.exports = router;