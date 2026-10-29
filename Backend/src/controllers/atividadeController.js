const prisma = require("../config/database");

async function listar(req, res) {
  const atividades = await prisma.atividade.findMany({
    include: {
      conteudo: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  res.json({
    sucesso: true,
    total: atividades.length,
    atividades
  });
}

async function buscarPorId(req, res) {
  const id = Number(req.params.id);

  const atividade = await prisma.atividade.findUnique({
    where: { id },
    include: {
      conteudo: true
    }
  });

  if (!atividade) {
    return res.status(404).json({
      sucesso: false,
      erro: "Atividade não encontrada."
    });
  }

  res.json({
    sucesso: true,
    atividade
  });
}

async function criar(req, res) {
  const atividade = await prisma.atividade.create({
    data: req.body
  });

  res.status(201).json({
    sucesso: true,
    mensagem: "Atividade criada com sucesso.",
    atividade
  });
}

async function atualizar(req, res) {
  const id = Number(req.params.id);

  const atividade = await prisma.atividade.update({
    where: { id },
    data: req.body
  });

  res.json({
    sucesso: true,
    mensagem: "Atividade atualizada com sucesso.",
    atividade
  });
}

async function remover(req, res) {
  const id = Number(req.params.id);

  await prisma.atividade.delete({
    where: { id }
  });

  res.json({
    sucesso: true,
    mensagem: "Atividade removida com sucesso."
  });
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  remover
};