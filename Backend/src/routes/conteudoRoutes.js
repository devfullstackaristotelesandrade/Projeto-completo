const express = require("express");

const autenticar = require("../middlewares/authMiddleware");
const permitirPerfis = require("../middlewares/roleMiddleware");

const validar = require("../middlewares/validationMiddleware");
const { conteudoSchema } = require("../validators/conteudoValidator");

const controller = require("../controllers/conteudoController");

const router = express.Router();

router.get(
  "/",
  autenticar,
  permitirPerfis("ALUNO", "PROFESSOR", "ADMIN"),
  controller.listar
);

router.get(
  "/:id",
  autenticar,
  permitirPerfis("ALUNO", "PROFESSOR", "ADMIN"),
  controller.buscarPorId
);

router.post(
  "/",
  autenticar,
  permitirPerfis("PROFESSOR", "ADMIN"),
  validar(conteudoSchema),
  controller.criar
);

router.put(
  "/:id",
  autenticar,
  permitirPerfis("PROFESSOR", "ADMIN"),
  validar(conteudoSchema),
  controller.atualizar
);

router.delete(
  "/:id",
  autenticar,
  permitirPerfis("ADMIN"),
  controller.remover
);

module.exports = router;