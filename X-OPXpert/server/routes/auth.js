// routes/auth.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Rota para verificar o status da sessão
router.get("/check-auth", authController.checkAuth);

module.exports = router;