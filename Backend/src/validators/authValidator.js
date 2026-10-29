const { z } = require("zod");

const registerSchema = z.object({
    nome: z
        .string()
        .min(3, "Nome deve possuir pelo menos 3 caracteres."),

    email: z
        .string()
        .email("E-mail inválido."),

    senha: z
        .string()
        .min(6, "Senha deve possuir pelo menos 6 caracteres.")
});

const loginSchema = z.object({
    email: z
        .string()
        .email("E-mail inválido."),

    senha: z
        .string()
        .min(1, "Senha obrigatória.")
});

module.exports = {
    registerSchema,
    loginSchema
};