const { pool } = require('../config/database');

const findByPacienteId = async (pacienteId) => {
  const [rows] = await pool.query(
    `SELECT a.id, a.data_agendamento, a.status, v.nome AS vacina, p.nome AS posto
     FROM agendamentos a
     JOIN vacinas v ON a.vacina_id = v.id
     JOIN postos_saude p ON a.posto_id = p.id
     WHERE a.paciente_id = ?
     ORDER BY a.data_agendamento DESC`,
    [pacienteId]
  );
  return rows;
};

module.exports = {
  tableName: 'agendamentos',
  columns: ['id', 'paciente_id', 'vacina_id', 'posto_id', 'data_agendamento', 'status', 'created_at', 'updated_at'],
  findByPacienteId
};