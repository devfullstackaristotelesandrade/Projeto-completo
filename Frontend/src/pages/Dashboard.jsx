import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import StatCard from "../components/dashboard/StatCard";
import EmptyState from "../components/common/EmptyState";
import Loading from "../components/common/Loading";
import Alert from "../components/common/Alert";

function Dashboard() {
  const { usuario } = useAuth();

  const [dashboard, setDashboard] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  async function carregarDashboard() {
    try {
      setCarregando(true);
      setErro("");

      const response = await api.get('/dashboard');

      console.log("📊 Dashboard:", response.data);

      setDashboard(response.data.dashboard);

    } catch (error) {
      console.error("❌ Erro Dashboard:", error);

      setErro(
        error.response?.data?.erro ||
        "Não foi possível carregar os dados do Dashboard."
      );
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    if (usuario) {
      carregarDashboard();
    }
  }, [usuario]);

  if (carregando) {
    return (
      <Loading
        className="dashboard-loading"
        message="Carregando seu Dashboard..."
        description="Estamos preparando seus dados de aprendizagem."
      />
    );
  }

  if (erro) {
    return (
      <div className="dashboard-error-page">
        <Alert title="Não foi possível carregar">{erro}</Alert>
        <button className="btn-primary" onClick={carregarDashboard}>
          🔄 Tentar novamente
        </button>
      </div>
    );
  }

  const dados = dashboard || {};

  const totalAtividades = dados.totalAtividades || 0;
  const acertos = dados.acertos || 0;
  const erros = dados.erros || 0;
  const percentual = dados.percentual || 0;
  const conteudosEstudados = dados.conteudosEstudados || 0;

  const disciplinas = dados.disciplinas || {};

  return (
    <div className="dashboard-page">

      {/* HEADER */}

      <section className="dashboard-welcome">

        <div>

          <span className="welcome-label">
            ÁREA DO ALUNO
          </span>

          <h1>
            Olá, {usuario?.nome}! 👋
          </h1>

          <p>
            Continue sua jornada de aprendizagem no Aprender+.
          </p>

        </div>

        <div className="welcome-actions">

          <Link
            to="/atividades"
            className="btn-primary"
          >
            📝 Estudar agora
          </Link>

        </div>

      </section>


      {/* CARDS */}

      <section className="dashboard-cards">
        <StatCard icon="📝" label="Atividades" value={totalAtividades} caption="realizadas" />
        <StatCard icon="✅" iconClassName="stat-icon success" label="Acertos" value={acertos} caption="respostas corretas" />
        <StatCard icon="❌" iconClassName="stat-icon danger" label="Erros" value={erros} caption="para revisar" />
        <StatCard icon="🎯" iconClassName="stat-icon warning" label="Aproveitamento" value={`${percentual}%`} caption="de desempenho" />
      </section>


      {/* CONTEÚDO PRINCIPAL */}

      <div className="dashboard-grid">

        {/* DESEMPENHO */}

        <section className="dashboard-panel">

          <div className="panel-header">

            <div>
              <h2>📈 Meu desempenho</h2>

              <p>
                Acompanhe seu desempenho por disciplina.
              </p>
            </div>

            <Link to="/progresso">
              Ver progresso
            </Link>

          </div>


          {Object.keys(disciplinas).length === 0 ? (

            <EmptyState
              icon="📚"
              title="Ainda não há dados"
              description="Faça algumas atividades para acompanhar seu desempenho."
              action={(
                <Link to="/atividades" className="btn-primary">
                  Começar atividades
                </Link>
              )}
            />

          ) : (

            <div className="discipline-list">

              {Object.entries(disciplinas).map(
                ([nome, dadosDisciplina]) => {

                  const percentualDisciplina =
                    dadosDisciplina.percentual || 0;

                  return (
                    <div
                      className="discipline-item"
                      key={nome}
                    >

                      <div className="discipline-top">

                        <strong>
                          {nome}
                        </strong>

                        <span>
                          {percentualDisciplina}%
                        </span>

                      </div>

                      <div className="progress-track">

                        <div
                          className="progress-value"
                          style={{
                            width: `${percentualDisciplina}%`
                          }}
                        />

                      </div>

                      <div className="discipline-info">

                        <span>
                          {dadosDisciplina.acertos || 0} acertos
                        </span>

                        <span>
                          {dadosDisciplina.total || 0} atividades
                        </span>

                      </div>

                    </div>
                  );
                }
              )}

            </div>
          )}

        </section>


        {/* RESUMO */}

        <section className="dashboard-panel summary-panel">

          <div className="panel-header">

            <div>
              <h2>📚 Minha aprendizagem</h2>

              <p>
                Seu resumo atual.
              </p>
            </div>

          </div>


          <div className="learning-summary">

            <div className="summary-item">

              <span className="summary-icon">
                📚
              </span>

              <div>
                <strong>
                  {conteudosEstudados}
                </strong>

                <span>
                  Conteúdos estudados
                </span>
              </div>

            </div>


            <div className="summary-item">

              <span className="summary-icon">
                🎯
              </span>

              <div>
                <strong>
                  {percentual}%
                </strong>

                <span>
                  Aproveitamento
                </span>
              </div>

            </div>


            <div className="summary-item">

              <span className="summary-icon">
                🏆
              </span>

              <div>
                <strong>
                  {acertos}
                </strong>

                <span>
                  Respostas corretas
                </span>
              </div>

            </div>

          </div>


          <Link
            to="/conteudos"
            className="summary-button"
          >
            Explorar conteúdos →
          </Link>

        </section>

      </div>


      {/* AÇÕES */}

      <section className="dashboard-panel quick-panel">

        <div className="panel-header">

          <div>
            <h2>🚀 Continue aprendendo</h2>

            <p>
              Escolha uma atividade para continuar seus estudos.
            </p>
          </div>

        </div>


        <div className="quick-actions">

          <Link
            to="/conteudos"
            className="quick-card"
          >

            <span>
              📚
            </span>

            <div>
              <strong>
                Conteúdos
              </strong>

              <small>
                Explore as matérias
              </small>
            </div>

            <b>
              →
            </b>

          </Link>


          <Link
            to="/atividades"
            className="quick-card"
          >

            <span>
              📝
            </span>

            <div>
              <strong>
                Atividades
              </strong>

              <small>
                Pratique seus conhecimentos
              </small>
            </div>

            <b>
              →
            </b>

          </Link>


          <Link
            to="/progresso"
            className="quick-card"
          >

            <span>
              📈
            </span>

            <div>
              <strong>
                Meu progresso
              </strong>

              <small>
                Veja seu histórico
              </small>
            </div>

            <b>
              →
            </b>

          </Link>

        </div>

      </section>

    </div>
  );
}

export default Dashboard;