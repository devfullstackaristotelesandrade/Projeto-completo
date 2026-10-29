const { z } = require("zod");

const progressoSchema = z.object({
  atividadeId: z.number().int().positive(),
  resposta: z.string().min(1, "Resposta obrigatória.")
});

module.exports = {
  progressoSchema
};