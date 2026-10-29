const jwt = require("jsonwebtoken");

function autenticar(req, res, next) {

    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({
            sucesso: false,
            erro: "Token não informado."
        });
    }

    const partes = authorization.split(" ");

    if (
        partes.length !== 2 ||
        partes[0] !== "Bearer"
    ) {
        return res.status(401).json({
            sucesso: false,
            erro: "Formato do token inválido."
        });
    }

    const token = partes[1];

    try {

        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.usuario = payload;

        next();

    } catch (error) {

        return res.status(401).json({
            sucesso: false,
            erro: "Token inválido ou expirado."
        });
    }
}

module.exports = autenticar;