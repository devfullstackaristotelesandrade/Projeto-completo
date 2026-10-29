const { z } = require("zod");

const atividadeSchema = z.object({
  conteudoId: z.number().int().positive(),
  pergunta: z.string().min(3),
  resposta: z.string().min(1),
  dificuldade: z.string().min(2)
});

module.exports = {
  atividadeSchema
};