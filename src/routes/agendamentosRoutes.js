const router = require('express').Router();
const validateBody = require('../middlewares/validateRequest');
const { requireAuth } = require('../middlewares/auth');
const agendamentosController = require('../controllers/agendamentosController');

const CAMPOS_OBRIGATORIOS = ['paciente_id', 'vacina_id', 'posto_id', 'data_agendamento'];

router.get('/meus-agendamentos', requireAuth, agendamentosController.listarMeusAgendamentos);

router.get('/', agendamentosController.getAll);
router.get('/:id', agendamentosController.getById);
router.post('/', validateBody(CAMPOS_OBRIGATORIOS), agendamentosController.create);
router.put('/:id', validateBody(CAMPOS_OBRIGATORIOS), agendamentosController.update);
router.delete('/:id', agendamentosController.remove);

module.exports = router;