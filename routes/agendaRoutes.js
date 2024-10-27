const express = require('express');
const router = express.Router();
const agendaController = require('../controllers/agendaController');

router.post('/', agendaController.save);
router.get('/list', agendaController.list);
router.get('/:id', agendaController.find);
router.put('/:id', agendaController.update);
router.delete('/:id', agendaController.remove);

module.exports = router;
