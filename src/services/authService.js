const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authModel = require('../models/authModel');

const register = async (userData) => {
    const { nome, cpf, email, senha, papel = 'cidadao' } = userData;

    // 1. Validações de e-mail e CPF...

    // 2. Hash da senha
    const senha_hash = await bcrypt.hash(senha, 10);

    // 3. Se for 'cidadao', cria primeiro o registro na tabela 'pacientes'
    let pacienteId = null;
    if (papel === 'cidadao') {
        pacienteId = await pacienteModel.create({ nome, cpf, email });
    }

    // 4. Cria o usuário passando o paciente_id vinculado
    const userId = await authModel.create({
        nome,
        cpf,
        email,
        senha_hash,
        papel,
        paciente_id: pacienteId // 👈 Vínculo automático
    });

    return { id: userId, nome, email, papel, paciente_id: pacienteId };
};

const login = async (email, senha) => {
    const usuario = await authModel.findByEmail(email);
    console.log("Usuário retornado do banco:", usuario)

    if (!usuario) {
        throw new Error('Credenciais inválidas');
    }

    const isPasswordValid = await bcrypt.compare(senha, usuario.senha_hash);
    if (!isPasswordValid) {
        throw new Error('Credenciais inválidas');
    }

    // Adicionado fallback para evitar crash caso process.env.JWT_SECRET seja undefined
    const secretKey = process.env.JWT_SECRET;

    // No authService.js (login):
    const token = jwt.sign(
        {
            id: usuario.id,
            email: usuario.email,
            papel: usuario.papel,
            paciente_id: usuario.paciente_id // 👈 Envia o ID no token
        },
        secretKey,
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