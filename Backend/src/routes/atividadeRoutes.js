const express = require("express");

const autenticar = require("../middlewares/authMiddleware");
const permitirPerfis = require("../middlewares/roleMiddleware");

const validar = require("../middlewares/validationMiddleware");
const { atividadeSchema } = require("../validators/atividadeValidator");

const controller = require("../controllers/atividadeController");

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
  validar(atividadeSchema),
  controller.criar
);

router.put(
  "/:id",
  autenticar,
  permitirPerfis("PROFESSOR", "ADMIN"),
  validar(atividadeSchema),
  controller.atualizar
);

router.delete(
  "/:id",
  autenticar,
  permitirPerfis("ADMIN"),
  controller.remover
);

module.exports = router;