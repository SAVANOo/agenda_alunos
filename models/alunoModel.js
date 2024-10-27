const pool = require('../config/database');

const save = async (aluno) => {
    const { nome, data_nascimento, email, telefone } = aluno;
    const result = await pool.query(
        'INSERT INTO alunos (nome, data_nascimento, email, telefone) VALUES ($1, $2, $3, $4) RETURNING *',
        [nome, data_nascimento, email, telefone]
    );
    return result.rows[0];
};

const list = async () => {
    const result = await pool.query('SELECT * FROM alunos');
    return result.rows;
};

const find = async (id) => {
    const result = await pool.query('SELECT * FROM alunos WHERE id = $1', [id]);
    return result.rows[0];
};

const update = async (id, aluno) => {
    const { nome, data_nascimento, email, telefone } = aluno;
    const result = await pool.query(
        'UPDATE alunos SET nome = $1, data_nascimento = $2, email = $3, telefone = $4 WHERE id = $5 RETURNING *',
        [nome, data_nascimento, email, telefone, id]
    );
    return result.rows[0];
};

const remove = async (id) => {
    const result = await pool.query('DELETE FROM alunos WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

module.exports = {
    save,
    list,
    find,
    update,
    remove
};
