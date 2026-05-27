const router = require('express').Router();

const acta2Controller =
    require('../controllers/acta2Controller');

const authMiddleware =
    require('../middlewares/authMiddleware');

router.get(
    '/',
    authMiddleware,
    acta2Controller.getActa2s
);

router.get(
    '/:id',
    authMiddleware,
    acta2Controller.getActa2ById
);

router.post(
    '/',
    authMiddleware,
    acta2Controller.crearActa2
);

router.put(
    '/:id',
    authMiddleware,
    acta2Controller.actualizarActa2
);

router.delete(
    '/:id',
    authMiddleware,
    acta2Controller.eliminarActa2
);

module.exports = router;