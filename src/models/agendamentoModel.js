// Representa a estrutura da tabela "agendamentos".
// status aceita: 'agendado' | 'concluido' | 'cancelado'
module.exports = {
  tableName: 'agendamentos',
  columns: ['id', 'paciente_id', 'vacina_id', 'posto_id', 'data_agendamento', 'status', 'created_at', 'updated_at']
};
