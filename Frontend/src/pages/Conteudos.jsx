import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Loading from "../components/common/Loading";
import Alert from "../components/common/Alert";
import PageTitle from "../components/common/PageTitle";
import EmptyState from "../components/common/EmptyState";

function Conteudos() {
  const [conteudos, setConteudos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarConteudos() {
      try {
        const response = await api.get("/conteudos");

        setConteudos(response.data.conteudos);
      } catch (error) {
        console.error(error);

        setErro(
          error.response?.data?.erro ||
          "Não foi possível carregar os conteúdos."
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarConteudos();
  }, []);

  if (carregando) {
    return <Loading message="Carregando conteúdos..." />;
  }

  return (
    <div>
      <PageTitle
        title="📚 Conteúdos"
        description="Explore os conteúdos disponíveis no Aprender+."
      />

      {erro && <Alert>{erro}</Alert>}

      {!erro && conteudos.length === 0 && (
        <EmptyState
          icon="📚"
          title="Nenhum conteúdo cadastrado"
          description="Novos conteúdos aparecerão aqui quando estiverem disponíveis."
          className="dashboard-section empty-state"
        />
      )}

      <div className="conteudos-grid">

        {conteudos.map((conteudo) => (

          <div
            className="conteudo-card"
            key={conteudo.id}
          >

            <div className="conteudo-card-header">

              <span className="badge">
                {conteudo.disciplina}
              </span>

              <span className="nivel">
                {conteudo.nivel}
              </span>

            </div>

            <h2>
              {conteudo.titulo}
            </h2>

            <p>
              {conteudo.descricao}
            </p>

            <div className="conteudo-footer">

              <span>
                {conteudo.atividades?.length || 0} atividades
              </span>

              <Link
                to={`/conteudos/${conteudo.id}`}
                className="btn-primary"
              >
                Ver conteúdo
              </Link>

            </div>

          </div>

        ))}

      </div>
    </div>
  );
}

export default Conteudos;