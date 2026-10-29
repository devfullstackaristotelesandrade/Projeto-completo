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
  conteudoId: "",
  pergunta: "",
  resposta: "",
  dificuldade: "Fácil"
};


function AdminAtividades() {
  const [atividades, setAtividades] = useState([]);
  const [conteudos, setConteudos] = useState([]);
  const [formulario, setFormulario] = useState(formularioInicial);

  const [editandoId, setEditandoId] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [confirmacao, setConfirmacao] = useState(null);
  const [excluindo, setExcluindo] = useState(false);

  async function carregarDados() {
    try {
      setCarregando(true);
      setErro("");

      const [atividadesResponse, conteudosResponse] =
        await Promise.all([
          api.get("/atividades"),
          api.get("/conteudos")
        ]);

      setAtividades(
        atividadesResponse.data.atividades || []
      );

      setConteudos(
        conteudosResponse.data.conteudos || []
      );
    } catch (error) {
      console.error(error);

      setErro(
        error.response?.data?.erro ||
          "Erro ao carregar atividades."
      );
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  function alterarCampo(event) {
    const { name, value } = event.target;

    setFormulario((estado) => ({
      ...estado,
      [name]:
        name === "conteudoId"
          ? Number(value)
          : value
    }));
  }

  function editarAtividade(atividade) {
    setEditandoId(atividade.id);

    setFormulario({
      conteudoId: atividade.conteudoId,
      pergunta: atividade.pergunta,
      resposta: atividade.resposta,
      dificuldade: atividade.dificuldade
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

  async function salvarAtividade(event) {
    event.preventDefault();

    try {
      setSalvando(true);
      setErro("");

      const dados = {
        ...formulario,
        conteudoId: Number(formulario.conteudoId)
      };

      if (editandoId) {
        await api.put(
          `/atividades/${editandoId}`,
          dados
        );
      } else {
        await api.post("/atividades", dados);
      }

      cancelarEdicao();
      await carregarDados();
    } catch (error) {
      console.error(error);

      setErro(
        error.response?.data?.erro ||
          "Erro ao salvar atividade."
      );
    } finally {
      setSalvando(false);
    }
  }

  function excluirAtividade(id, pergunta) {
    setConfirmacao({ id, nome: pergunta });
  }

  async function confirmarExclusao() {
    if (!confirmacao) return;
    try {
      setExcluindo(true);
      setErro("");
      await api.delete(`/atividades/${confirmacao.id}`);
      setConfirmacao(null);
      await carregarDados();
    } catch (error) {
      console.error(error);
      setErro(error.response?.data?.erro || "Erro ao excluir atividade.");
    } finally {
      setExcluindo(false);
    }
  }

  function nomeConteudo(id) {
    const conteudo = conteudos.find(
      (item) => item.id === id
    );

    return conteudo?.titulo || "Conteúdo não encontrado";
  }

  if (carregando) {
    return <Loading className="admin-loading" message="Carregando atividades..." />;
  }

  return (
    <div className="admin-page">
      <PageTitle
        className="admin-header"
        eyebrow="ADMINISTRAÇÃO"
        title="Atividades"
        description="Gerencie as atividades relacionadas aos conteúdos."
      />

      {erro && <Alert className="admin-error">⚠️ {erro}</Alert>}

      <section className="admin-form-card">
        <h2>
          {editandoId
            ? "✏️ Editar atividade"
            : "➕ Nova atividade"}
        </h2>

        <form onSubmit={salvarAtividade}>
          <FormField label="Conteúdo" name="conteudoId" as="select" value={formulario.conteudoId} onChange={alterarCampo} required options={[{ value: "", label: "Selecione um conteúdo" }, ...conteudos.map((conteudo) => ({ value: conteudo.id, label: conteudo.titulo }))]} />

          <FormField label="Pergunta" name="pergunta" as="textarea" value={formulario.pergunta} onChange={alterarCampo} required minLength={3} rows={4} />

          <div className="admin-form-grid">
            <FormField label="Resposta correta" name="resposta" value={formulario.resposta} onChange={alterarCampo} required />

            <FormField label="Dificuldade" name="dificuldade" as="select" value={formulario.dificuldade} onChange={alterarCampo} options={[{ value: "Fácil", label: "Fácil" }, { value: "Médio", label: "Médio" }, { value: "Difícil", label: "Difícil" }]} />
          </div>

          <div className="admin-form-actions">
            <button
              type="submit"
              disabled={salvando}
            >
              {salvando
                ? "Salvando..."
                : editandoId
                ? "Salvar alterações"
                : "Criar atividade"}
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
          { key: "pergunta", label: "Pergunta" },
          { key: "conteudo", label: "Conteúdo", render: (atividade) => nomeConteudo(atividade.conteudoId) },
          { key: "dificuldade", label: "Dificuldade" },
          { key: "acoes", label: "Ações", render: (atividade) => (
            <ActionButtons
              onEdit={() => editarAtividade(atividade)}
              onDelete={() => excluirAtividade(atividade.id, atividade.pergunta)}
            />
          ) }
        ]}
        rows={atividades}
        emptyMessage="Nenhuma atividade cadastrada."
        emptyIcon="📝"
      />
      <ConfirmDialog
        open={Boolean(confirmacao)}
        title="Excluir atividade?"
        message={confirmacao ? `A atividade “${confirmacao.nome}” será excluída. Esta ação não pode ser desfeita.` : ""}
        loading={excluindo}
        onCancel={() => setConfirmacao(null)}
        onConfirm={confirmarExclusao}
      />
    </div>
  );
}

export default AdminAtividades;