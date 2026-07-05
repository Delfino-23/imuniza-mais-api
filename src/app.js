const express = require('express');
const cors = require('cors');

const pacientesRoutes = require('./routes/pacientesRoutes');
const vacinasRoutes = require('./routes/vacinasRoutes');
const postosSaudeRoutes = require('./routes/postosSaudeRoutes');
const agendamentosRoutes = require('./routes/agendamentosRoutes');
const historicoRoutes = require('./routes/historicoRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/pacientes', pacientesRoutes);
app.use('/api/vacinas', vacinasRoutes);
app.use('/api/postos', postosSaudeRoutes);
app.use('/api/agendamentos', agendamentosRoutes);
app.use('/api/historico', historicoRoutes);

// Middleware de erro: deve ser o último a ser registrado
app.use(errorHandler);

module.exports = app;
