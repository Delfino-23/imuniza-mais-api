const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota pública de cadastro do cidadão
router.post('/cadastro', authController.registerCidadao);

// Rota pública de login
router.post('/login', authController.login);

// Rota interna (que você pode proteger com middleware de autenticação depois)
router.post('/admin/cadastrar-funcionario', authController.registerFuncionario);

module.exports = router;