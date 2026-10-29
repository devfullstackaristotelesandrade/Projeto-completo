const prisma = require("../config/database");

async function me(req, res) {
    try {

        const usuario = await prisma.user.findUnique({
            where: {
                id: req.usuario.id
            },
            select: {
                id: true,
                nome: true,
                email: true,
                perfil: true,
                createdAt: true,
                updatedAt: true
            }
        });

        if (!usuario) {
            return res.status(404).json({
                sucesso: false,
                erro: "Usuário não encontrado."
            });
        }

        res.json({
            sucesso: true,
            usuario
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            sucesso: false,
            erro: "Erro ao consultar usuário."
        });
    }
}

module.exports = {
    me
};