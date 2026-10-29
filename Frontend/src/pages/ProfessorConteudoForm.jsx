import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function ProfessorConteudoForm() {
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const [nivel, setNivel] = useState("");

  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setErro("");
    setSalvando(true);

    try {
      await api.post("/conteudos", {
        titulo,
        descricao,
        disciplina,
        nivel
      });

      navigate("/professor");

    } catch (error) {
      console.error(error);

      setErro(
        error.response?.data?.erro ||
        "Não foi possível criar o conteúdo."
      );
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div>

      <div className="page-header">

        <h1>📚 Novo conteúdo</h1>

        <p>
          Cadastre um novo conteúdo educacional.
        </p>

      </div>

      <div className="form-card">

        {erro && (
          <p style={{ color: "red" }}>
            {erro}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          <label>
            Título
          </label>

          <input
            value={titulo}
            onChange={(event) =>
              setTitulo(event.target.value)
            }
            required
          />

          <label>
            Descrição
          </label>

          <textarea
            value={descricao}
            onChange={(event) =>
              setDescricao(event.target.value)
            }
            rows="5"
            required
          />

          <label>
            Disciplina
          </label>

          <input
            value={disciplina}
            onChange={(event) =>
              setDisciplina(event.target.value)
            }
            placeholder="Ex.: Matemática"
            required
          />

          <label>
            Nível
          </label>

          <select
            value={nivel}
            onChange={(event) =>
              setNivel(event.target.value)
            }
            required
          >
            <option value="">
              Selecione
            </option>

            <option value="Fundamental I">
              Fundamental I
            </option>

            <option value="Fundamental II">
              Fundamental II
            </option>

            <option value="Ensino Médio">
              Ensino Médio
            </option>
          </select>

          <button
            type="submit"
            className="btn-primary"
            disabled={salvando}
          >
            {salvando
              ? "Salvando..."
              : "Salvar conteúdo"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default ProfessorConteudoForm;