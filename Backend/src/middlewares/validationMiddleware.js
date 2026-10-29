function validar(schema) {
    return (req, res, next) => {

        const resultado = schema.safeParse(req.body);

        if (!resultado.success) {

            return res.status(400).json({
                sucesso: false,
                erro: "Dados inválidos.",
                detalhes: resultado.error.issues.map((item) => ({
                    campo: item.path.join("."),
                    mensagem: item.message
                }))
            });
        }

        req.body = resultado.data;

        next();
    };
}

module.exports = validar;