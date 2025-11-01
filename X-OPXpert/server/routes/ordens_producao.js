// routes/ordens_producao.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/ordens_producao');

router.post('/', ctrl.criar);
router.get('/', ctrl.listar);
router.get('/:id', ctrl.obter);
router.put('/:id', ctrl.atualizar);
router.delete('/:id', ctrl.deletar);

// --- NOVA ROTA DE APONTAMENTO ---
router.post('/:id/apontar', ctrl.apontar);

module.exports = router;