const express = require("express");

const router = express.Router();

const autenticar = require("../middlewares/authMiddleware");
const permitirPerfis = require("../middlewares/roleMiddleware");
const {
  dashboard,
  listarUsuarios,
  alterarPerfil,
  removerUsuario
} = require("../controllers/adminController");

const  validar  = require("../middlewares/validationMiddleware");
const {alterarPerfilSchema} = require("../validators/adminValidator");


router.get(
  "/dashboard",
  autenticar,
  permitirPerfis("ADMIN"),
  dashboard
);


router.get(
  "/usuarios",
  autenticar,
  permitirPerfis("ADMIN"),
  listarUsuarios
);


router.put(
  "/usuarios/:id/perfil",
  autenticar,
  permitirPerfis("ADMIN"),
  validar(alterarPerfilSchema),
  alterarPerfil
);


router.delete(
  "/usuarios/:id",
  autenticar,
  permitirPerfis("ADMIN"),
  removerUsuario
);


module.exports = router;