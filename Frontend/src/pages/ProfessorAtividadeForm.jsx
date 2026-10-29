import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function ProfessorAtividadeForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pergunta, setPergunta] = useState("");
  const [resposta, setResposta] = useState("");
  const [dificuldade, setDificuldade] = useState("");

  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setErro("");
    setSalvando(true);

    try {
      await api.post("/atividades", {
        conteudoId: Number(id),
        pergunta,
        resposta,
        dificuldade
      });

      navigate("/professor");

    } catch (error) {
      console.error(error);

      setErro(
        error.response?.data?.erro ||
        "Não foi possível criar a atividade."
      );
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div>

      <div className="page-header">

        <h1>📝 Nova atividade</h1>

        <p>
          Cadastre uma atividade para este conteúdo.
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
            Pergunta
          </label>

          <textarea
            value={pergunta}
            onChange={(event) =>
              setPergunta(event.target.value)
            }
            rows="5"
            required
          />

          <label>
            Resposta correta
          </label>

          <input
            value={resposta}
            onChange={(event) =>
              setResposta(event.target.value)
            }
            required
          />

          <label>
            Dificuldade
          </label>

          <select
            value={dificuldade}
            onChange={(event) =>
              setDificuldade(event.target.value)
            }
            required
          >

            <option value="">
              Selecione
            </option>

            <option value="Fácil">
              Fácil
            </option>

            <option value="Médio">
              Médio
            </option>

            <option value="Difícil">
              Difícil
            </option>

          </select>

          <button
            type="submit"
            className="btn-primary"
            disabled={salvando}
          >
            {salvando
              ? "Salvando..."
              : "Salvar atividade"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default ProfessorAtividadeForm;