function errorMiddleware(error, req, res, next) {
  console.error("❌ ERRO:", error);

  if (res.headersSent) {
    return next(error);
  }

  return res.status(error.status || 500).json({
    sucesso: false,
    erro:
      error.message ||
      "Erro interno do servidor."
  });
}

module.exports = errorMiddleware;