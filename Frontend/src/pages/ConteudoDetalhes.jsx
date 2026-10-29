import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

function ConteudoDetalhes() {
  const { id } = useParams();

  const [conteudo, setConteudo] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarConteudo() {
      try {
        const response = await api.get(`/conteudos/${id}`);

        setConteudo(response.data.conteudo);
      } catch (error) {
        console.error(error);

        setErro(
          error.response?.data?.erro ||
          "Não foi possível carregar o conteúdo."
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarConteudo();
  }, [id]);

  if (carregando) {
    return (
      <div>
        <h1>Carregando...</h1>
      </div>
    );
  }

  if (erro) {
    return (
      <div>
        <h1>Erro</h1>

        <p style={{ color: "red" }}>
          {erro}
        </p>

        <Link to="/conteudos">
          Voltar
        </Link>
      </div>
    );
  }

  return (
    <div>

      <div className="page-header">

        <Link to="/conteudos">
          ← Voltar para conteúdos
        </Link>

        <h1>
          {conteudo.titulo}
        </h1>

        <p>
          {conteudo.descricao}
        </p>

      </div>

      <div className="dashboard-section">

        <p>
          <strong>Disciplina:</strong>{" "}
          {conteudo.disciplina}
        </p>

        <p>
          <strong>Nível:</strong>{" "}
          {conteudo.nivel}
        </p>

      </div>

      <div className="dashboard-section">

        <h2>
          📝 Atividades
        </h2>

        {conteudo.atividades?.length === 0 ? (

          <p>
            Este conteúdo ainda não possui atividades.
          </p>

        ) : (

          <div className="atividades-lista">

            {conteudo.atividades?.map((atividade, index) => (

              <div
                className="atividade-item"
                key={atividade.id}
              >

                <div>

                  <strong>
                    Atividade {index + 1}
                  </strong>

                  <p>
                    {atividade.pergunta}
                  </p>

                </div>

                <span className="badge">
                  {atividade.dificuldade}
                </span>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default ConteudoDetalhes;