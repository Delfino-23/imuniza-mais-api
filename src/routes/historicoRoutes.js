const router = require('express').Router();
const validateBody = require('../middlewares/validateRequest');
const historicoController = require('../controllers/historicoController');

router.get('/', historicoController.getAll);

// Histórico de vacinação de um paciente específico
router.get('/paciente/:pacienteId', historicoController.getByPaciente);

router.post(
  '/',
  validateBody(['paciente_id', 'vacina_id', 'data_aplicacao', 'dose', 'profissional_responsavel']),
  historicoController.create
);

module.exports = router;
