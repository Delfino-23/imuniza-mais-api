const { pool } = require('../config/database');

const getAll = async () => {
  const [rows] = await pool.query('SELECT * FROM vacinas ORDER BY nome');
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM vacinas WHERE id = ?', [id]);
  return rows[0];
};

const create = async (data) => {
  const { nome, fabricante, quantidade_estoque, validade } = data;

  const [result] = await pool.query(
    'INSERT INTO vacinas (nome, fabricante, quantidade_estoque, validade) VALUES (?, ?, ?, ?)',
    [nome, fabricante || null, quantidade_estoque || 0, validade || null]
  );

  return getById(result.insertId);
};

const update = async (id, data) => {
  const { nome, fabricante, quantidade_estoque, validade } = data;

  await pool.query(
    'UPDATE vacinas SET nome = ?, fabricante = ?, quantidade_estoque = ?, validade = ? WHERE id = ?',
    [nome, fabricante || null, quantidade_estoque || 0, validade || null, id]
  );

  return getById(id);
};

const remove = async (id) => {
  await pool.query('DELETE FROM vacinas WHERE id = ?', [id]);
};

module.exports = { getAll, getById, create, update, remove };
