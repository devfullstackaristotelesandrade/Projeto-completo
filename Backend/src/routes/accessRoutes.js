const express = require("express");

const autenticar = require("../middlewares/authMiddleware");

const permitirPerfis = require("../middlewares/roleMiddleware");

const {
    aluno,
    professor,
    admin,
    professorOuAdmin
} = require("../controllers/accessController");

const router = express.Router();


// ALUNO
router.get(
    "/aluno",
    autenticar,
    permitirPerfis("ALUNO"),
    aluno
);


// PROFESSOR
router.get(
    "/professor",
    autenticar,
    permitirPerfis("PROFESSOR"),
    professor
);


// ADMIN
router.get(
    "/admin",
    autenticar,
    permitirPerfis("ADMIN"),
    admin
);


// PROFESSOR OU ADMIN
router.get(
    "/professor-admin",
    autenticar,
    permitirPerfis("PROFESSOR", "ADMIN"),
    professorOuAdmin
);

module.exports = router;