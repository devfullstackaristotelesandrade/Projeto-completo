const express = require("express");

const autenticar = require("../middlewares/authMiddleware");
const permitirPerfis = require("../middlewares/roleMiddleware");
const validar = require("../middlewares/validationMiddleware");

const { progressoSchema } = require("../validators/progressoValidator");

const {
  registrar,
  meuProgresso
} = require("../controllers/progressoController");

const router = express.Router();

router.post(
  "/",
  autenticar,
  permitirPerfis("ALUNO"),
  validar(progressoSchema),
  registrar
);

router.get(
  "/me",
  autenticar,
  permitirPerfis("ALUNO"),
  meuProgresso
);

module.exports = router;