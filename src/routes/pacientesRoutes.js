const router = require('express').Router();
const validateBody = require('../middlewares/validateRequest');
const pacientesController = require('../controllers/pacientesController');

router.get('/', pacientesController.getAll);
router.get('/:id', pacientesController.getById);
router.post('/', validateBody(['nome', 'cpf', 'data_nascimento']), pacientesController.create);
router.put('/:id', validateBody(['nome', 'cpf', 'data_nascimento']), pacientesController.update);
router.delete('/:id', pacientesController.remove);

module.exports = router;
