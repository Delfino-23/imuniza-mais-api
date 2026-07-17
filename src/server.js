const dotenv = require('dotenv');

dotenv.config();

const app = require('./app');
const { testConnection } = require('./config/database');

const PORT = Number(process.env.PORT || 4000);

const startServer = async () => {
  await testConnection();

  app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
  });
};

startServer();
