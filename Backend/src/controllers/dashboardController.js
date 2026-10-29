const prisma = require("../config/database");

async function dashboard(req, res) {
  try {
    const userId = req.usuario.id;

    const progresso = await prisma.progresso.findMany({
      where: {
        userId
      },
      include: {
        atividade: {
          include: {
            conteudo: true
          }
        }
      }
    });

    const total = progresso.length;

    const acertos = progresso.filter(
      item => item.acertou
    ).length;

    const erros = total - acertos;

    const percentual =
      total > 0
        ? Number(((acertos / total) * 100).toFixed(2))
        : 0;

    const disciplinas = {};

    progresso.forEach(item => {
      const disciplina = item.atividade.conteudo.disciplina;

      if (!disciplinas[disciplina]) {
        disciplinas[disciplina] = {
          total: 0,
          acertos: 0,
          erros: 0
        };
      }

      disciplinas[disciplina].total++;

      if (item.acertou) {
        disciplinas[disciplina].acertos++;
      } else {
        disciplinas[disciplina].erros++;
      }
    });

    Object.keys(disciplinas).forEach(disciplina => {
      const dados = disciplinas[disciplina];

      dados.percentual = Number(
        ((dados.acertos / dados.total) * 100).toFixed(2)
      );
    });

    const conteudos = [
      ...new Set(
        progresso.map(
          item => item.atividade.conteudo.titulo
        )
      )
    ];

    res.json({
      sucesso: true,

      dashboard: {
        usuarioId: userId,
        totalAtividades: total,
        acertos,
        erros,
        percentual,
        conteudosEstudados: conteudos.length,
        disciplinas
      }
    });
  } catch (error) {
    console.error("Erro no dashboard:", error);

    res.status(500).json({
      sucesso: false,
      erro: "Erro ao carregar dashboard."
    });
  }
}

module.exports = {
  dashboard
};