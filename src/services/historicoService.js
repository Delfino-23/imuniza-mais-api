const { pool } = require('../config/database');

// Query base com JOINs para trazer o nome do paciente e da vacina
// junto com cada registro de aplicação.
const SELECT_BASE = `
  SELECT
    h.id,
    h.paciente_id,
    h.vacina_id,
    h.data_aplicacao,
    h.dose,
    h.profissional_responsavel,
    p.nome AS paciente_nome,
    v.nome AS vacina_nome
  FROM historico_vacinal h
  JOIN pacientes p ON p.id = h.paciente_id
  JOIN vacinas v ON v.id = h.vacina_id
`;

const getAll = async () => {
  const [rows] = await pool.query(`${SELECT_BASE} ORDER BY h.data_aplicacao DESC`);
  return rows;
};

// Lista o histórico vacinal de um paciente específico
const getByPaciente = async (pacienteId) => {
  const [rows] = await pool.query(
    `${SELECT_BASE} WHERE h.paciente_id = ? ORDER BY h.data_aplicacao DESC`,
    [pacienteId]
  );
  return rows;
};

const create = async (data) => {
  const { paciente_id, vacina_id, data_aplicacao, dose, profissional_responsavel } = data;

  const [result] = await pool.query(
    'INSERT INTO historico_vacinal (paciente_id, vacina_id, data_aplicacao, dose, profissional_responsavel) VALUES (?, ?, ?, ?, ?)',
    [paciente_id, vacina_id, data_aplicacao, dose, profissional_responsavel]
  );

  const [rows] = await pool.query(`${SELECT_BASE} WHERE h.id = ?`, [result.insertId]);
  return rows[0];
};

module.exports = { getAll, getByPaciente, create };
