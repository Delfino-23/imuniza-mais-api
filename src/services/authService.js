const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authModel = require('../models/authModel');

const register = async (userData) => {
    const { nome, cpf, email, senha, papel = 'cidadao' } = userData;

    const existingEmail = await authModel.findByEmail(email);
    if (existingEmail) {
        throw new Error('E-mail já cadastrado');
    }

    const existingCpf = await authModel.findByCpf(cpf);
    if (existingCpf) {
        throw new Error('CPF já cadastrado');
    }

    const senha_hash = await bcrypt.hash(senha, 10);

    const userId = await authModel.create({
        nome,
        cpf,
        email,
        senha_hash,
        papel
    });

    return { id: userId, nome, email, papel };
};

const login = async (email, senha) => {
    const usuario = await authModel.findByEmail(email);
    if (!usuario) {
        throw new Error('Credenciais inválidas');
    }

    const isPasswordValid = await bcrypt.compare(senha, usuario.senha_hash);
    if (!isPasswordValid) {
        throw new Error('Credenciais inválidas');
    }

    const token = jwt.sign(
        { id: usuario.id, email: usuario.email, papel: usuario.papel },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    return {
        token,
        usuario: {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            papel: usuario.papel
        }
    };
};

module.exports = {
    register,
    login
};