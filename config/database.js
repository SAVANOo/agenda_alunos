require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

function connectWithRetry() {
    pool.connect()
        .then(() => console.log('Conectado ao banco de dados!'))
        .catch(err => {
            console.error('Erro ao conectar ao banco de dados', err.stack)
            console.error('Tentando reconectar ao banco em 3 minutos...')
            setTimeout(connectWithRetry, 3 * 60 * 1000);
        });
}

connectWithRetry();
module.exports = pool;
