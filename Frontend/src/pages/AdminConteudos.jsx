import { useEffect, useState } from "react";
import api from "../services/api";
import Loading from "../components/common/Loading";
import Alert from "../components/common/Alert";
import PageTitle from "../components/common/PageTitle";
import ConfirmDialog from "../components/common/ConfirmDialog";
import DataTable from "../components/common/DataTable";
import ActionButtons from "../components/common/ActionButtons";
import FormField from "../components/common/FormField";



const formularioInicial = {
  titulo: "",
  descricao: "",
  disciplina: "",
  nivel: ""
};

function AdminConteudos() {
  const [conteudos, setConteudos] = useState([]);
  const [formulario, setFormulario] = useState(formularioInicial);
  const [editandoId, setEditandoId] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [confirmacao, setConfirmacao] = useState(null);
  const [excluindo, setExcluindo] = useState(false);

  async function carregarConteudos() {
    try {
      setCarregando(true);
      setErro("");

      const response = await api.get("/conteudos");

      setConteudos(response.data.conteudos || []);
    } catch (error) {
      console.error(error);

      setErro(
        error.response?.data?.erro ||
          "Erro ao carregar conteúdos."
      );
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarConteudos();
  }, []);

  function alterarCampo(event) {
    const { name, value } = event.target;

    setFormulario((estado) => ({
      ...estado,
      [name]: value
    }));
  }

  function editarConteudo(conteudo) {
    setEditandoId(conteudo.id);

    setFormulario({
      titulo: conteudo.titulo,
      descricao: conteudo.descricao,
      disciplina: conteudo.disciplina,
      nivel: conteudo.nivel
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  function cancelarEdicao() {
    setEditandoId(null);
    setFormulario(formularioInicial);
  }

  async function salvarConteudo(event) {
    event.preventDefault();

    try {
      setSalvando(true);
      setErro("");

      if (editandoId) {
        await api.put(
          `/conteudos/${editandoId}`,
          formulario
        );
      } else {
        await api.post("/conteudos", formulario);
      }

      cancelarEdicao();
      await carregarConteudos();
    } catch (error) {
      console.error(error);

      setErro(
        error.response?.data?.erro ||
          "Erro ao salvar conteúdo."
      );
    } finally {
      setSalvando(false);
    }
  }

  function excluirConteudo(id, titulo) {
    setConfirmacao({ id, nome: titulo });
  }

  async function confirmarExclusao() {
    if (!confirmacao) return;
    try {
      setExcluindo(true);
      setErro("");
      await api.delete(`/conteudos/${confirmacao.id}`);
      setConfirmacao(null);
      await carregarConteudos();
    } catch (error) {
      console.error(error);
      setErro(error.response?.data?.erro || "Erro ao excluir conteúdo.");
    } finally {
      setExcluindo(false);
    }
  }

  if (carregando) {
    return <Loading className="admin-loading" message="Carregando conteúdos..." />;
  }

  return (
    <div className="admin-page">
      <PageTitle
        className="admin-header"
        eyebrow="ADMINISTRAÇÃO"
        title="Conteúdos"
        description="Cadastre, edite e remova conteúdos educacionais."
      />

      {erro && <Alert className="admin-error">⚠️ {erro}</Alert>}

      <section className="admin-form-card">
        <h2>
          {editandoId
            ? "✏️ Editar conteúdo"
            : "➕ Novo conteúdo"}
        </h2>

        <form onSubmit={salvarConteudo}>
          <div className="admin-form-grid">
            <FormField label="Título" name="titulo" value={formulario.titulo} onChange={alterarCampo} required minLength={3} />

            <FormField label="Disciplina" name="disciplina" value={formulario.disciplina} onChange={alterarCampo} required />

            <FormField label="Nível" name="nivel" value={formulario.nivel} onChange={alterarCampo} required />
          </div>

          <FormField label="Descrição" name="descricao" as="textarea" value={formulario.descricao} onChange={alterarCampo} required minLength={5} rows={4} />

          <div className="admin-form-actions">
            <button
              type="submit"
              disabled={salvando}
            >
              {salvando
                ? "Salvando..."
                : editandoId
                ? "Salvar alterações"
                : "Criar conteúdo"}
            </button>

            {editandoId && (
              <button
                type="button"
                className="admin-secondary-button"
                onClick={cancelarEdicao}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </section>

      <DataTable
        columns={[
          { key: "titulo", label: "Título", render: (conteudo) => <strong>{conteudo.titulo}</strong> },
          { key: "disciplina", label: "Disciplina" },
          { key: "nivel", label: "Nível" },
          { key: "atividades", label: "Atividades", render: (conteudo) => conteudo.atividades?.length || 0 },
          { key: "acoes", label: "Ações", render: (conteudo) => (
            <ActionButtons
              onEdit={() => editarConteudo(conteudo)}
              onDelete={() => excluirConteudo(conteudo.id, conteudo.titulo)}
            />
          ) }
        ]}
        rows={conteudos}
        emptyMessage="Nenhum conteúdo cadastrado."
        emptyIcon="📚"
      />
      <ConfirmDialog
        open={Boolean(confirmacao)}
        title="Excluir conteúdo?"
        message={confirmacao ? `O conteúdo “${confirmacao.nome}” será excluído. As atividades vinculadas também poderão ser removidas.` : ""}
        loading={excluindo}
        onCancel={() => setConfirmacao(null)}
        onConfirm={confirmarExclusao}
      />
    </div>
  );
}

export default AdminConteudos;