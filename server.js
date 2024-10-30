const express = require('express');
const cors = require('cors');
const alunoRoutes = require('./routes/alunoRoutes');
const agendaRoutes = require('./routes/agendaRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/agenda', agendaRoutes);
app.use('/api/alunos', alunoRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
