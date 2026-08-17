const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes')
const pacientesRoutes = require('./routes/pacientesRoutes');
const vacinasRoutes = require('./routes/vacinasRoutes');
const postosSaudeRoutes = require('./routes/postosSaudeRoutes');
const agendamentosRoutes = require('./routes/agendamentosRoutes');
const historicoRoutes = require('./routes/historicoRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors({
    origin: [
        'http://localhost:5173', // Altere para a porta que seu front local usa (3000, 5173, etc.)
        'https://imuniza-mais-web.vercel.app' // Coloque aqui a URL do seu front quando fizer o deploy dele
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/pacientes', pacientesRoutes);
app.use('/api/vacinas', vacinasRoutes);
app.use('/api/postos', postosSaudeRoutes);
app.use('/api/agendamentos', agendamentosRoutes);
app.use('/api/historico', historicoRoutes);

// Middleware de erro: deve ser o último a ser registrado
app.use(errorHandler);

module.exports = app;
