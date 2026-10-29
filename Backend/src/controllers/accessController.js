function aluno(req, res) {
    res.json({
        sucesso: true,
        mensagem: "Área permitida para ALUNO.",
        usuario: req.usuario
    });
}

function professor(req, res) {
    res.json({
        sucesso: true,
        mensagem: "Área permitida para PROFESSOR.",
        usuario: req.usuario
    });
}

function admin(req, res) {
    res.json({
        sucesso: true,
        mensagem: "Área permitida para ADMIN.",
        usuario: req.usuario
    });
}

function professorOuAdmin(req, res) {
    res.json({
        sucesso: true,
        mensagem: "Área permitida para PROFESSOR ou ADMIN.",
        usuario: req.usuario
    });
}

module.exports = {
    aluno,
    professor,
    admin,
    professorOuAdmin
};