const dotenv = require('dotenv');

dotenv.config();

const app = require('./app');
const { testConnection } = require('./config/database');

const PORT = Number(process.env.PORT || 3000);

const startServer = async () => {
  await testConnection();

  app.listen(PORT, () => {
    console.log(`Servidor iniciado em http://localhost:${PORT}`);
  });
};

startServer();
