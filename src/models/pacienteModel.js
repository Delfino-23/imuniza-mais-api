// Representa a estrutura da tabela "pacientes".
// Funciona como referência de schema para as demais camadas e
// facilita uma futura migração para um ORM (ex: Sequelize/Prisma).
module.exports = {
  tableName: 'pacientes',
  columns: ['id', 'nome', 'cpf', 'data_nascimento', 'telefone', 'email', 'created_at', 'updated_at']
};
