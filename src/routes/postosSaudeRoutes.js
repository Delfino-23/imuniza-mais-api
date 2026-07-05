const router = require('express').Router();
const validateBody = require('../middlewares/validateRequest');
const postosSaudeController = require('../controllers/postosSaudeController');

router.get('/', postosSaudeController.getAll);
router.get('/:id', postosSaudeController.getById);
router.post('/', validateBody(['nome', 'endereco']), postosSaudeController.create);
router.put('/:id', validateBody(['nome', 'endereco']), postosSaudeController.update);
router.delete('/:id', postosSaudeController.remove);

module.exports = router;
