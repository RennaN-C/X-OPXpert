const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/fornecedoresController');

router.get('/', ctrl.listar);
router.post('/', ctrl.criar);

module.exports = router;