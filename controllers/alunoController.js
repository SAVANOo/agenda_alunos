const alunoModel = require('../models/alunoModel');

const save = async (req, res) => {
    try {
        const aluno = await alunoModel.save(req.body);
        res.status(201).json(aluno);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar aluno', error: error.message });
    }
};

const list = async (req, res) => {
    try {
        const alunos = await alunoModel.list();
        res.status(200).json(alunos);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar alunos', error: error.message });
    }
};

const find = async (req, res) => {
    const { id } = req.params;
    try {
        const aluno = await alunoModel.find(id);
        if (!aluno) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }
        res.status(200).json(aluno);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar aluno', error: error.message });
    }
};

const update = async (req, res) => {
    const { id } = req.params;
    try {
        const aluno = await alunoModel.update(id, req.body);
        if (!aluno) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }
        res.status(200).json(aluno);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar aluno', error: error.message });
    }
};

const remove = async (req, res) => {
    const { id } = req.params;
    try {
        const aluno = await alunoModel.remove(id);
        if (!aluno) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar aluno', error: error.message });
    }
};

module.exports = {
    save,
    list,
    find,
    update,
    remove
};
