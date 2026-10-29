import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

function AtividadeDetalhes() {
  const { id } = useParams();

  const [atividade, setAtividade] = useState(null);
  const [resposta, setResposta] = useState("");
  const [resultado, setResultado] = useState(null);

  const [carregando, setCarregando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarAtividade() {
      try {
        const response = await api.get(`/atividades/${id}`);

        setAtividade(response.data.atividade);
      } catch (error) {
        console.error(error);

        setErro(
          error.response?.data?.erro ||
          "Não foi possível carregar a atividade."
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarAtividade();
  }, [id]);

  async function responderAtividade(event) {
    event.preventDefault();

    if (!resposta.trim()) {
      setErro("Digite uma resposta.");
      return;
    }

    setErro("");
    setResultado(null);
    setEnviando(true);

    try {
      const response = await api.post("/progresso", {
        atividadeId: Number(id),
        resposta: resposta.trim()
      });

      setResultado(response.data);

    } catch (error) {
      console.error(error);

      setErro(
        error.response?.data?.erro ||
        "Não foi possível registrar sua resposta."
      );
    } finally {
      setEnviando(false);
    }
  }

  if (carregando) {
    return (
      <div>
        <h1>Carregando atividade...</h1>
      </div>
    );
  }

  if (erro && !atividade) {
    return (
      <div>
        <h1>Erro</h1>

        <p style={{ color: "red" }}>
          {erro}
        </p>

        <Link to="/atividades">
          ← Voltar
        </Link>
      </div>
    );
  }

  return (
    <div>

      <div className="page-header">

        <Link to="/atividades">
          ← Voltar para atividades
        </Link>

        <h1>
          📝 Atividade
        </h1>

      </div>

      <div className="atividade-detalhe">

        <div className="atividade-topo">

          <span className="badge">
            {atividade.conteudo?.disciplina}
          </span>

          <span className="nivel">
            {atividade.dificuldade}
          </span>

        </div>

        <h2>
          {atividade.pergunta}
        </h2>

        <p>
          Conteúdo:{" "}
          <strong>
            {atividade.conteudo?.titulo}
          </strong>
        </p>

        <form onSubmit={responderAtividade}>

          <label>
            Sua resposta
          </label>

          <textarea
            value={resposta}
            onChange={(event) => setResposta(event.target.value)}
            placeholder="Digite sua resposta..."
            rows="5"
            disabled={!!resultado}
          />

          <br />

          {!resultado && (
            <button
              type="submit"
              className="btn-primary"
              disabled={enviando}
            >
              {enviando
                ? "Enviando..."
                : "Enviar resposta"}
            </button>
          )}

        </form>

        {erro && (
          <div className="resultado-erro">
            {erro}
          </div>
        )}

        {resultado && (
          <div
            className={
              resultado.acertou
                ? "resultado-correto"
                : "resultado-incorreto"
            }
          >

            <h3>
              {resultado.acertou
                ? "🎉 Resposta correta!"
                : "❌ Resposta incorreta"}
            </h3>

            <p>
              {resultado.mensagem}
            </p>

            {!resultado.acertou && (
              <p>
                Revise o conteúdo e tente novamente
                em uma próxima atividade.
              </p>
            )}

            <Link
              to="/dashboard"
              className="btn-primary"
            >
              Ver meu progresso
            </Link>

          </div>
        )}

      </div>

    </div>
  );
}

export default AtividadeDetalhes;