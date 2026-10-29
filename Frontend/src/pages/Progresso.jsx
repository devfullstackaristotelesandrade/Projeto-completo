import { useEffect, useState } from "react";
import api from "../services/api";
import Loading from "../components/common/Loading";
import Alert from "../components/common/Alert";
import PageTitle from "../components/common/PageTitle";
import EmptyState from "../components/common/EmptyState";
import StatCard from "../components/dashboard/StatCard";

function Progresso() {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarProgresso() {
      try {
        const response = await api.get("/progresso/me");

        setDados(response.data);
      } catch (error) {
        console.error(error);

        setErro(
          error.response?.data?.erro ||
          "Não foi possível carregar o progresso."
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarProgresso();
  }, []);

  if (carregando) {
    return <Loading message="Carregando progresso..." />;
  }

  if (erro) {
    return (
      <div>
        <PageTitle title="Meu progresso" description="Acompanhe seu desempenho nas atividades." />
        <Alert>{erro}</Alert>
      </div>
    );
  }

  return (
    <div>

      <PageTitle
        title="📈 Meu progresso"
        description="Acompanhe seu desempenho nas atividades."
      />

      <div className="dashboard-cards">
        <StatCard className="dashboard-card" icon="📊" iconClassName="stat-icon" label="Total" value={dados.resumo.total} />
        <StatCard className="dashboard-card" icon="✅" iconClassName="stat-icon" label="Acertos" value={dados.resumo.acertos} />
        <StatCard className="dashboard-card" icon="❌" iconClassName="stat-icon" label="Erros" value={dados.resumo.erros} />
        <StatCard className="dashboard-card" icon="🎯" iconClassName="stat-icon" label="Aproveitamento" value={`${dados.resumo.percentual}%`} />
      </div>

      <div className="dashboard-section">

        <h2>Histórico</h2>

        {dados.progresso.length === 0 ? (
          <EmptyState
            icon="📈"
            title="Seu histórico está vazio"
            description="Responda algumas atividades para acompanhar seu progresso."
          />
        ) : (
          <div className="progresso-lista">

            {dados.progresso.map((item) => (

              <div
                className="progresso-item"
                key={item.id}
              >

                <div>
                  <strong>
                    {item.atividade.pergunta}
                  </strong>

                  <p>
                    Resposta: {item.resposta}
                  </p>

                  <small>
                    {item.atividade.conteudo.titulo}
                  </small>
                </div>

                <span
                  className={
                    item.acertou
                      ? "status-correto"
                      : "status-incorreto"
                  }
                >
                  {item.acertou
                    ? "✓ Correto"
                    : "✕ Incorreto"}
                </span>

              </div>

            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default Progresso;