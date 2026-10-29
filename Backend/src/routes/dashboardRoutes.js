const express = require("express");

const autenticar = require("../middlewares/authMiddleware");
const permitirPerfis = require("../middlewares/roleMiddleware");

const { dashboard } = require("../controllers/dashboardController");

const router = express.Router();

router.get(
  "/",
  autenticar,
  permitirPerfis("ALUNO"),
  dashboard
);

module.exports = router;