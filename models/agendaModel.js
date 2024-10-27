const pool = require('../config/database');

const save = async (agenda) => {
    const { aluno_id, data, hora, descricao, local } = agenda;
    const result = await pool.query(
        'INSERT INTO agenda_aluno (aluno_id, data, hora, descricao, local) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [aluno_id, data, hora, descricao, local]
    );
    return result.rows[0];
};

const list = async () => {
    const result = await pool.query('SELECT * FROM agenda_aluno');
    return result.rows;
};

const find = async (id) => {
    const result = await pool.query('SELECT * FROM agenda_aluno WHERE id = $1', [id]);
    return result.rows[0];
};

const update = async (id, agenda) => {
    const { aluno_id, data, hora, descricao, local } = agenda;
    const result = await pool.query(
        'UPDATE agenda_aluno SET aluno_id = $1, data = $2, hora = $3, descricao = $4, local = $5 WHERE id = $6 RETURNING *',
        [aluno_id, data, hora, descricao, local, id]
    );
    return result.rows[0];
};

const remove = async (id) => {
    const result = await pool.query('DELETE FROM agenda_aluno WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

module.exports = {
    save,
    list,
    find,
    update,
    remove,
};