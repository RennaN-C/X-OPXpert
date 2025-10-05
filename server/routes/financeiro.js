const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/financeiro');

router.post('/', ctrl.criar);
router.get('/', ctrl.listar);
router.get('/:id', ctrl.obter);
router.put('/:id', ctrl.atualizar);
router.delete('/:id', ctrl.deletar);

module.exports = router;