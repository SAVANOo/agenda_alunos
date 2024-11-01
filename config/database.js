require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
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
