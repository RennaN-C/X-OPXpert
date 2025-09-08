const express = require("express");
const router = express.Router();
const controller = require("../controllers/funcionarios");

// Rotas CRUD
router.get("/", controller.listar);        // GET todos
router.get("/:id", controller.obter);      // GET por ID
router.post("/", controller.criar);        // POST criar
router.put("/:id", controller.atualizar);  // PUT atualizar
router.delete("/:id", controller.deletar); // DELETE apagar

module.exports = router;
