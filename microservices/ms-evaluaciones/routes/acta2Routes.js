const router = require('express').Router();

const acta2Controller =
    require('../controllers/acta2Controller');

const authMiddleware =
    require('../middlewares/authMiddleware');

router.get(
    '/',
    //authMiddleware,
    acta2Controller.getActa2s
);

router.get(
    '/:_id',
    //authMiddleware,
    acta2Controller.getActa2ById
);

router.post(
    '/',
    //authMiddleware,
    acta2Controller.crearActa2
);

router.put(
    '/:_id',
    //authMiddleware,
    acta2Controller.actualizarActa2
);

router.delete(
    '/:_id',
    //authMiddleware,
    acta2Controller.eliminarActa2
);

module.exports = router;