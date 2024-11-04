const pool = require('../config/database');

const save = async (agenda) => {
    const { aluno_id, data, descricao, local } = agenda;
    const result = await pool.query(
        'INSERT INTO agenda (aluno_id, data, descricao, local) VALUES ($1, $2, $3, $4) RETURNING *',
        [aluno_id, data, descricao, local]
    );
    return result.rows[0];
};

const list = async () => {
    const result = await pool.query('SELECT * FROM agenda');
    return result.rows;
};

const find = async (id) => {
    const result = await pool.query('SELECT * FROM agenda WHERE id = $1', [id]);
    return result.rows[0];
};

const update = async (id, agenda) => {
    const { aluno_id, data, descricao, local } = agenda;
    const result = await pool.query(
        'UPDATE agenda SET data = $1, descricao = $2, local = $3 WHERE id = $4 RETURNING *',
        [data, descricao, local, id]
    );
    return result.rows[0];
};

const remove = async (id) => {
    const result = await pool.query('DELETE FROM agenda WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

module.exports = {
    save,
    list,
    find,
    update,
    remove,
};
