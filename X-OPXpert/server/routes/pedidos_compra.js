// routes/pedidos_compra.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/pedidosCompraController');

router.get('/', ctrl.listar);
router.post('/', ctrl.criar);

module.exports = router;