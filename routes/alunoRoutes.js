const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');

router.post('/', alunoController.save);
router.get('/list', alunoController.list);
router.get('/:id', alunoController.find);
router.put('/:id', alunoController.update);
router.delete('/:id', alunoController.remove);

module.exports = router;
