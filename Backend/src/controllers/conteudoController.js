const prisma = require("../config/database");

async function listar(req, res) {
  const conteudos = await prisma.conteudo.findMany({
    include: {
      atividades: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  res.json({
    sucesso: true,
    total: conteudos.length,
    conteudos
  });
}

async function buscarPorId(req, res) {
  const id = Number(req.params.id);

  const conteudo = await prisma.conteudo.findUnique({
    where: { id },
    include: {
      atividades: true
    }
  });

  if (!conteudo) {
    return res.status(404).json({
      sucesso: false,
      erro: "Conteúdo não encontrado."
    });
  }

  res.json({
    sucesso: true,
    conteudo
  });
}

async function criar(req, res) {
  const conteudo = await prisma.conteudo.create({
    data: req.body
  });

  res.status(201).json({
    sucesso: true,
    mensagem: "Conteúdo criado com sucesso.",
    conteudo
  });
}

async function atualizar(req, res) {
  const id = Number(req.params.id);

  const conteudo = await prisma.conteudo.update({
    where: { id },
    data: req.body
  });

  res.json({
    sucesso: true,
    mensagem: "Conteúdo atualizado com sucesso.",
    conteudo
  });
}

async function remover(req, res) {
  const id = Number(req.params.id);

  await prisma.conteudo.delete({
    where: { id }
  });

  res.json({
    sucesso: true,
    mensagem: "Conteúdo removido com sucesso."
  });
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  remover
};