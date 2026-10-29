const { z } = require("zod");

const conteudoSchema = z.object({
  titulo: z.string().min(3),
  descricao: z.string().min(5),
  disciplina: z.string().min(2),
  nivel: z.string().min(2)
});

module.exports = {
  conteudoSchema
};