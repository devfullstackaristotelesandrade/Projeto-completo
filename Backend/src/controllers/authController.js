const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const prisma = require("../config/database");

async function register(req, res) {
    try {
        const { nome, email, senha } = req.body;

        const usuarioExistente = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (usuarioExistente) {
            return res.status(409).json({
                sucesso: false,
                erro: "E-mail já cadastrado."
            });
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const usuario = await prisma.user.create({
            data: {
                nome,
                email,
                senha: senhaHash,
                perfil: "ALUNO"
            },
            select: {
                id: true,
                nome: true,
                email: true,
                perfil: true,
                createdAt: true
            }
        });

        return res.status(201).json({
            sucesso: true,
            mensagem: "Usuário criado com sucesso.",
            usuario
        });

    } catch (error) {

        console.error("Erro no cadastro:", error);

        return res.status(500).json({
            sucesso: false,
            erro: "Erro interno ao cadastrar usuário."
        });
    }
}


async function login(req, res) {
    try {
        const { email, senha } = req.body;

        const usuario = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!usuario) {
            return res.status(401).json({
                sucesso: false,
                erro: "E-mail ou senha inválidos."
            });
        }

        const senhaValida = await bcrypt.compare(
            senha,
            usuario.senha
        );

        if (!senhaValida) {
            return res.status(401).json({
                sucesso: false,
                erro: "E-mail ou senha inválidos."
            });
        }

        const token = jwt.sign(
            {
                id: usuario.id,
                perfil: usuario.perfil
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || "8h"
            }
        );

        return res.status(200).json({
            sucesso: true,
            mensagem: "Login realizado com sucesso.",
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                perfil: usuario.perfil
            }
        });

    } catch (error) {

        console.error("Erro no login:", error);

        return res.status(500).json({
            sucesso: false,
            erro: "Erro interno no login."
        });
    }
}


module.exports = {
    register,
    login
};