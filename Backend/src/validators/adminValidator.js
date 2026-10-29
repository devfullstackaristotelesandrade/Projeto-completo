const { z } = require("zod");

const alterarPerfilSchema = z.object({
  perfil: z.enum([
    "ALUNO",
    "PROFESSOR",
    "ADMIN"
  ])
});

module.exports = {
  alterarPerfilSchema
};