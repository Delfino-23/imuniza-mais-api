const router = require('express').Router();
const validateBody = require('../middlewares/validateRequest');
const vacinasController = require('../controllers/vacinasController');

router.get('/', vacinasController.getAll);
router.get('/:id', vacinasController.getById);
router.post('/', validateBody(['nome', 'quantidade_estoque']), vacinasController.create);
router.put('/:id', validateBody(['nome', 'quantidade_estoque']), vacinasController.update);
router.delete('/:id', vacinasController.remove);

module.exports = router;
