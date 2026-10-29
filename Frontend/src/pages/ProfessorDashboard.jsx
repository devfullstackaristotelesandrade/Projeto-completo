import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function ProfessorDashboard() {
  const [conteudos, setConteudos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

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

  useEffect(() => {
    carregarConteudos();
  }, []);

  async function excluirConteudo(id) {
    const confirmar = window.confirm(
      "Deseja realmente excluir este conteúdo?"
    );

    if (!confirmar) {
      return;
    }

    try {
      await api.delete(`/conteudos/${id}`);

      await carregarConteudos();

    } catch (error) {
      alert(
        error.response?.data?.erro ||
        "Não foi possível excluir o conteúdo."
      );
    }
  }

  if (carregando) {
    return <p>Carregando painel...</p>;
  }

  return (
    <div>

      <div className="page-header">

        <h1>👨‍🏫 Área do Professor</h1>

        <p>
          Gerencie conteúdos e atividades educacionais.
        </p>

      </div>

      <div className="dashboard-section">

        <div className="professor-header">

          <h2>Conteúdos</h2>

          <Link
            to="/professor/conteudos/novo"
            className="btn-primary"
          >
            + Novo conteúdo
          </Link>

        </div>

        {erro && (
          <p style={{ color: "red" }}>
            {erro}
          </p>
        )}

        {conteudos.length === 0 ? (

          <p>
            Nenhum conteúdo cadastrado.
          </p>

        ) : (

          <div className="professor-lista">

            {conteudos.map((conteudo) => (

              <div
                className="professor-item"
                key={conteudo.id}
              >

                <div>

                  <strong>
                    {conteudo.titulo}
                  </strong>

                  <p>
                    {conteudo.disciplina} — {conteudo.nivel}
                  </p>

                  <small>
                    {conteudo.atividades?.length || 0}
                    {" "}atividade(s)
                  </small>

                </div>

                <div className="acoes">

                  <Link
                    to={`/professor/conteudos/${conteudo.id}/atividades`}
                    className="btn-primary"
                  >
                    Atividades
                  </Link>

                  <button
                    onClick={() =>
                      excluirConteudo(conteudo.id)
                    }
                  >
                    Excluir
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default ProfessorDashboard;