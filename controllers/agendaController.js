const agendaModel = require('../models/agendaModel');

const save = async (req, res) => {
    try {
        const agenda = await agendaModel.save(req.body);
        res.status(201).json(agenda);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar agenda', error: error.message });
    }
};

const list = async (req, res) => {
    try {
        const agendas = await agendaModel.list();
        res.status(200).json(agendas);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar agendas', error: error.message });
    }
};

const find = async (req, res) => {
    const { id } = req.params;
    try {
        const agenda = await agendaModel.find(id);
        if (!agenda) {
            return res.status(404).json({ message: 'Agenda não encontrada' });
        }
        res.status(200).json(agenda);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar agenda', error: error.message });
    }
};

const update = async (req, res) => {
    const { id } = req.params;
    try {
        const agenda = await agendaModel.update(id, req.body);
        if (!agenda) {
            return res.status(404).json({ message: 'Agenda não encontrada' });
        }
        res.status(200).json(agenda);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar agenda', error: error.message });
    }
};

const remove = async (req, res) => {
    const { id } = req.params;
    try {
        const agenda = await agendaModel.remove(id);
        if (!agenda) {
            return res.status(404).json({ message: 'Agenda não encontrada' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Erro ao remover agenda', error: error.message });
    }
};

module.exports = {
    save,
    list,
    find,
    update,
    remove,
};
