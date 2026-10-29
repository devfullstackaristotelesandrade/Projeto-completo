import { useEffect, useState } from "react";
import api from "../services/api";
import Loading from "../components/common/Loading";
import Alert from "../components/common/Alert";
import PageTitle from "../components/common/PageTitle";
import ConfirmDialog from "../components/common/ConfirmDialog";
import EmptyState from "../components/common/EmptyState";
import DataTable from "../components/common/DataTable";
import ActionButtons from "../components/common/ActionButtons";

function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [busca, setBusca] = useState("");
  const [confirmacao, setConfirmacao] = useState(null);
  const [excluindo, setExcluindo] = useState(false);

  async function carregarUsuarios() {
    try {
      setCarregando(true);
      const response = await api.get("/admin/usuarios");
      setUsuarios(response.data.usuarios || []);
      setErro("");
    } catch (error) {
      console.error(error);
      setErro(error.response?.data?.erro || "Erro ao carregar usuários.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => { carregarUsuarios(); }, []);

  async function alterarPerfil(id, perfil) {
    try {
      setErro("");
      await api.put(`/admin/usuarios/${id}/perfil`, { perfil });
      await carregarUsuarios();
    } catch (error) {
      setErro(error.response?.data?.erro || "Erro ao alterar perfil.");
    }
  }

  async function confirmarExclusao() {
    if (!confirmacao) return;
    try {
      setExcluindo(true);
      setErro("");
      await api.delete(`/admin/usuarios/${confirmacao.id}`);
      setConfirmacao(null);
      await carregarUsuarios();
    } catch (error) {
      setErro(error.response?.data?.erro || "Erro ao excluir usuário.");
    } finally {
      setExcluindo(false);
    }
  }

  const textoBusca = busca.trim().toLocaleLowerCase("pt-BR");
  const usuariosFiltrados = usuarios.filter((usuario) =>
    `${usuario.nome || ""} ${usuario.email || ""}`.toLocaleLowerCase("pt-BR").includes(textoBusca)
  );

  const columns = [
    { key: "nome", label: "Usuário", render: (usuario) => <strong>{usuario.nome}</strong> },
    { key: "email", label: "E-mail" },
    { key: "perfil", label: "Perfil", render: (usuario) => (
      <select aria-label={`Perfil de ${usuario.nome}`} value={usuario.perfil} onChange={(event) => alterarPerfil(usuario.id, event.target.value)}>
        <option value="ALUNO">ALUNO</option>
        <option value="PROFESSOR">PROFESSOR</option>
        <option value="ADMIN">ADMIN</option>
      </select>
    ) },
    { key: "createdAt", label: "Cadastro", render: (usuario) => usuario.createdAt ? new Date(usuario.createdAt).toLocaleDateString("pt-BR") : "—" },
    { key: "acoes", label: "Ações", render: (usuario) => (
      <ActionButtons onDelete={() => setConfirmacao({ id: usuario.id, nome: usuario.nome })} />
    ) }
  ];

  if (carregando) return <Loading message="Carregando usuários..." className="admin-loading" />;

  return (
    <div className="admin-page">
      <PageTitle className="admin-header" eyebrow="ADMINISTRAÇÃO" title="Usuários" description="Gerencie os usuários do Aprender+." />
      {erro && <Alert className="admin-error">{erro}</Alert>}
      <div className="admin-toolbar">
        <input type="search" aria-label="Buscar usuários" placeholder="🔎 Buscar por nome ou e-mail..." value={busca} onChange={(event) => setBusca(event.target.value)} />
        <strong>{usuariosFiltrados.length} usuários</strong>
      </div>
      {usuariosFiltrados.length === 0 ? (
        <EmptyState icon="👥" title="Nenhum usuário encontrado" description="Altere a busca para encontrar outros usuários." className="empty-state" />
      ) : (
        <DataTable columns={columns} rows={usuariosFiltrados} emptyMessage="Nenhum usuário encontrado." />
      )}
      <ConfirmDialog open={Boolean(confirmacao)} title="Excluir usuário?" message={confirmacao ? `O usuário “${confirmacao.nome}” será removido permanentemente.` : ""} loading={excluindo} onCancel={() => setConfirmacao(null)} onConfirm={confirmarExclusao} />
    </div>
  );
}

export default AdminUsuarios;
