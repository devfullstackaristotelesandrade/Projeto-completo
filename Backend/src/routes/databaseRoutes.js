const express = require("express");

const prisma = require("../config/database");

const router = express.Router();

router.get("/test", async (req, res) => {
    try {
        const usuarios = await prisma.user.count();

        res.status(200).json({
            sucesso: true,
            banco: "SQLite",
            prisma: "conectado",
            usuarios
        });

    } catch (error) {

        console.error("Erro Prisma:", error);

        res.status(500).json({
            sucesso: false,
            erro: "Erro ao consultar o banco.",
            detalhes: error.message
        });
    }
});

module.exports = router;