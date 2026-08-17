const authService = require('../services/authService');

const registerCidadao = async (req, res, next) => {
    try {
        // Força o papel como 'cidadao' no cadastro público
        const usuario = await authService.register({ ...req.body, papel: 'cidadao' });

        res.status(201).json({
            success: true,
            message: 'Usuário cadastrado com sucesso',
            data: usuario
        });
    } catch (error) {
        next(error);
    }
};

const registerFuncionario = async (req, res, next) => {
    try {
        // Cadastro restrito a ser feito por outro funcionário no painel
        const usuario = await authService.register({ ...req.body, papel: 'funcionario' });

        res.status(201).json({
            success: true,
            message: 'Funcionário cadastrado com sucesso',
            data: usuario
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, senha } = req.body;
        const result = await authService.login(email, senha);

        res.json({
            success: true,
            message: 'Login realizado com sucesso',
            data: result
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerCidadao,
    registerFuncionario,
    login
};