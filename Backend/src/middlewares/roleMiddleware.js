function permitirPerfis(...perfisPermitidos) {
    return (req, res, next) => {

        if (!req.usuario) {
            return res.status(401).json({
                sucesso: false,
                erro: "Usuário não autenticado."
            });
        }

        if (!perfisPermitidos.includes(req.usuario.perfil)) {
            return res.status(403).json({
                sucesso: false,
                erro: "Acesso negado.",
                perfilAtual: req.usuario.perfil,
                perfisPermitidos
            });
        }

        next();
    };
}

module.exports = permitirPerfis;