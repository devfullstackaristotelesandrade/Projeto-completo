import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Loading from "../components/common/Loading";
import Alert from "../components/common/Alert";
import PageTitle from "../components/common/PageTitle";
import EmptyState from "../components/common/EmptyState";

function Atividades() {
  const [atividades, setAtividades] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarAtividades() {
      try {
        const response = await api.get("/atividades");

        setAtividades(response.data.atividades);
      } catch (error) {
        console.error(error);

        setErro(
          error.response?.data?.erro ||
          "Não foi possível carregar as atividades."
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarAtividades();
  }, []);

  if (carregando) {
    return <Loading message="Carregando atividades..." />;
  }

  return (
    <div>

      <PageTitle
        title="📝 Atividades"
        description="Escolha uma atividade para estudar."
      />

      {erro && <Alert>{erro}</Alert>}

      {!erro && atividades.length === 0 && (
        <EmptyState
          icon="📝"
          title="Nenhuma atividade cadastrada"
          description="As atividades disponíveis aparecerão aqui."
          className="dashboard-section empty-state"
        />
      )}

      <div className="atividades-grid">

        {atividades.map((atividade, index) => (

          <div
            className="atividade-card"
            key={atividade.id}
          >

            <div className="atividade-topo">

              <span className="badge">
                {atividade.conteudo?.disciplina}
              </span>

              <span className="nivel">
                {atividade.dificuldade}
              </span>

            </div>

            <h2>
              Atividade {index + 1}
            </h2>

            <p className="pergunta">
              {atividade.pergunta}
            </p>

            <div className="atividade-info">

              <span>
                📚 {atividade.conteudo?.titulo}
              </span>

              <Link
                to={`/atividades/${atividade.id}`}
                className="btn-primary"
              >
                Responder
              </Link>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Atividades;