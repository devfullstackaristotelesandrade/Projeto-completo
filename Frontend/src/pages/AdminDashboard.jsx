import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Loading from "../components/common/Loading";
import Alert from "../components/common/Alert";
import PageTitle from "../components/common/PageTitle";
import StatCard from "../components/dashboard/StatCard";


function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

   


  async function carregarDashboard() {
    try {
      setCarregando(true);
      setErro("");

      const response = await api.get("/admin/dashboard");

      setDashboard(response.data.dashboard);
    } catch (error) {
      console.error("Erro Admin Dashboard:", error);

      setErro(
        error.response?.data?.erro ||
          "Não foi possível carregar o painel administrativo."
      );
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarDashboard();
  }, []);

  if (carregando) {
    return <Loading className="admin-loading" message="Carregando painel administrativo..." />;
  }

  if (erro) {
    return (
      <Alert className="admin-error" title="⚠️ Erro">
        <p>{erro}</p>
        <button type="button" onClick={carregarDashboard}>
          🔄 Tentar novamente
        </button>
      </Alert>
    );
  }

  const usuarios = dashboard?.usuarios || {};

  return (
    <div className="admin-page">

      <PageTitle
        className="admin-header"
        eyebrow="ADMINISTRAÇÃO"
        title="Painel Administrativo"
        description="Gerencie usuários, conteúdos e atividades do Aprender+."
      />

      <section className="admin-stats">
        <StatCard className="admin-stat" iconClassName="admin-stat-icon" icon="👥" label="Usuários" value={usuarios.total || 0} />
        <StatCard className="admin-stat" iconClassName="admin-stat-icon" icon="🎓" label="Alunos" value={usuarios.alunos || 0} />
        <StatCard className="admin-stat" iconClassName="admin-stat-icon" icon="👨‍🏫" label="Professores" value={usuarios.professores || 0} />
        <StatCard className="admin-stat" iconClassName="admin-stat-icon" icon="📚" label="Conteúdos" value={dashboard?.conteudos || 0} />
        <StatCard className="admin-stat" iconClassName="admin-stat-icon" icon="📝" label="Atividades" value={dashboard?.atividades || 0} />
        <StatCard className="admin-stat" iconClassName="admin-stat-icon" icon="📊" label="Respostas" value={dashboard?.respostas || 0} />
      </section>

      <section className="admin-actions">

        <Link to="/admin/usuarios" className="admin-action-card">
          <span>👥</span>
          <div>
            <strong>Usuários</strong>
            <small>Gerenciar usuários e perfis</small>
          </div>
          <b>→</b>
        </Link>

        <Link to="/admin/conteudos" className="admin-action-card">
          <span>📚</span>
          <div>
            <strong>Conteúdos</strong>
            <small>Gerenciar conteúdos educacionais</small>
          </div>
          <b>→</b>
        </Link>

        <Link to="/admin/atividades" className="admin-action-card">
          <span>📝</span>
          <div>
            <strong>Atividades</strong>
            <small>Gerenciar atividades</small>
          </div>
          <b>→</b>
        </Link>


      </section>

    </div>
  );
}

export default AdminDashboard;