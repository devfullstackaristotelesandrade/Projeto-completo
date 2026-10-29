const prisma = require("../config/database");

async function dashboard(req, res) {
  try {
    const [
      totalUsuarios,
      totalAlunos,
      totalProfessores,
      totalAdmins,
      totalConteudos,
      totalAtividades,
      totalRespostas
    ] = await Promise.all([
      prisma.user.count(),

      prisma.user.count({
        where: {
          perfil: "ALUNO"
        }
      }),

      prisma.user.count({
        where: {
          perfil: "PROFESSOR"
        }
      }),

      prisma.user.count({
        where: {
          perfil: "ADMIN"
        }
      }),

      prisma.conteudo.count(),

      prisma.atividade.count(),

      prisma.progresso.count()
    ]);

    return res.json({
      sucesso: true,
      dashboard: {
        usuarios: {
          total: totalUsuarios,
          alunos: totalAlunos,
          professores: totalProfessores,
          admins: totalAdmins
        },

        conteudos: totalConteudos,

        atividades: totalAtividades,

        respostas: totalRespostas
      }
    });

  } catch (error) {
    console.error("Erro dashboard administrativo:", error);

    return res.status(500).json({
      sucesso: false,
      erro: "Erro ao carregar dashboard administrativo."
    });
  }
}


async function listarUsuarios(req, res) {
  try {
    const usuarios = await prisma.user.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        perfil: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return res.json({
      sucesso: true,
      total: usuarios.length,
      usuarios
    });

  } catch (error) {
    console.error("Erro ao listar usuários:", error);

    return res.status(500).json({
      sucesso: false,
      erro: "Erro ao listar usuários."
    });
  }
}


async function alterarPerfil(req, res) {
  try {
    const id = Number(req.params.id);
    const { perfil } = req.body;

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        sucesso: false,
        erro: "ID de usuário inválido."
      });
    }

    const perfisPermitidos = [
      "ALUNO",
      "PROFESSOR",
      "ADMIN"
    ];

    if (!perfisPermitidos.includes(perfil)) {
      return res.status(400).json({
        sucesso: false,
        erro: "Perfil inválido."
      });
    }

    const usuario = await prisma.user.findUnique({
      where: {
        id
      }
    });

    if (!usuario) {
      return res.status(404).json({
        sucesso: false,
        erro: "Usuário não encontrado."
      });
    }

    const atualizado = await prisma.user.update({
      where: {
        id
      },
      data: {
        perfil
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

    return res.json({
      sucesso: true,
      mensagem: "Perfil atualizado com sucesso.",
      usuario: atualizado
    });

  } catch (error) {
    console.error("Erro ao alterar perfil:", error);

    return res.status(500).json({
      sucesso: false,
      erro: "Erro ao alterar perfil."
    });
  }
}


async function removerUsuario(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        sucesso: false,
        erro: "ID de usuário inválido."
      });
    }

    if (id === req.usuario.id) {
      return res.status(400).json({
        sucesso: false,
        erro: "O administrador atual não pode excluir a própria conta."
      });
    }

    const usuario = await prisma.user.findUnique({
      where: {
        id
      }
    });

    if (!usuario) {
      return res.status(404).json({
        sucesso: false,
        erro: "Usuário não encontrado."
      });
    }

    await prisma.user.delete({
      where: {
        id
      }
    });

    return res.json({
      sucesso: true,
      mensagem: "Usuário removido com sucesso."
    });

  } catch (error) {
    console.error("Erro ao remover usuário:", error);

    return res.status(500).json({
      sucesso: false,
      erro: "Erro ao remover usuário."
    });
  }
}


module.exports = {
  dashboard,
  listarUsuarios,
  alterarPerfil,
  removerUsuario
};