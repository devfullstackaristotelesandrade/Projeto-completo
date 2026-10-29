const prisma = require("../config/database");

async function registrar(req, res) {
  try {
    const { atividadeId, resposta } = req.body;

    const atividade = await prisma.atividade.findUnique({
      where: { id: atividadeId }
    });

    if (!atividade) {
      return res.status(404).json({
        sucesso: false,
        erro: "Atividade não encontrada."
      });
    }

    const acertou =
      resposta.trim().toLowerCase() ===
      atividade.resposta.trim().toLowerCase();

    const progresso = await prisma.progresso.create({
      data: {
        userId: req.usuario.id,
        atividadeId,
        resposta,
        acertou
      },
      include: {
        atividade: {
          include: {
            conteudo: true
          }
        }
      }
    });

    res.status(201).json({
      sucesso: true,
      mensagem: acertou ? "Resposta correta!" : "Resposta incorreta.",
      acertou,
      progresso
    });
  } catch (error) {
    console.error("Erro ao registrar progresso:", error);

    res.status(500).json({
      sucesso: false,
      erro: "Erro ao registrar progresso."
    });
  }
}

async function meuProgresso(req, res) {
  try {
    const progresso = await prisma.progresso.findMany({
      where: {
        userId: req.usuario.id
      },
      include: {
        atividade: {
          include: {
            conteudo: true
          }
        }
      },
      orderBy: {
        data: "desc"
      }
    });

    const total = progresso.length;
    const acertos = progresso.filter(item => item.acertou).length;
    const erros = total - acertos;

    const percentual =
      total > 0 ? Number(((acertos / total) * 100).toFixed(2)) : 0;

    res.json({
      sucesso: true,
      resumo: {
        total,
        acertos,
        erros,
        percentual
      },
      progresso
    });
  } catch (error) {
    console.error("Erro ao consultar progresso:", error);

    res.status(500).json({
      sucesso: false,
      erro: "Erro ao consultar progresso."
    });
  }
}

module.exports = {
  registrar,
  meuProgresso
};