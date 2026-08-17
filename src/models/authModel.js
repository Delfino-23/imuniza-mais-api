// src/models/authModel.js

// 1. Desestruture 'pool' em vez de importar 'db'
const { pool } = require('../config/database');

const findByEmail = async (email) => {
    // 2. Use 'pool.query' em vez de 'db.query'
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    return rows[0];
};

const findByCpf = async (cpf) => {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE cpf = ?', [cpf]);
    return rows[0];
};

const create = async ({ nome, cpf, email, senha_hash, papel }) => {
    const [result] = await pool.query(
        'INSERT INTO usuarios (nome, cpf, email, senha_hash, papel) VALUES (?, ?, ?, ?, ?)',
        [nome, cpf, email, senha_hash, papel]
    );
    return result.insertId;
};

module.exports = {
    findByEmail,
    findByCpf,
    create
};