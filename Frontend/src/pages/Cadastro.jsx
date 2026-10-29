import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/auth.css";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);

  const { cadastro } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    setErro("");
    setSucesso("");

    if (nome.trim().length < 3) {
      setErro("Digite seu nome completo.");
      return;
    }

    if (senha.length < 6) {
      setErro("A senha deve possuir pelo menos 6 caracteres.");
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    try {
      setCarregando(true);

      await cadastro(
        nome.trim(),
        email.trim(),
        senha
      );

      setSucesso(
        "Conta criada com sucesso! Redirecionando..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      console.error("Erro no cadastro:", error);

      setErro(
        error.response?.data?.erro ||
          "Não foi possível criar sua conta."
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="auth-page">

      {/* LADO ESQUERDO */}
      <section className="auth-hero">

        <div className="auth-hero-content">

          <div className="auth-logo">
            <span>+</span>
            Aprender
          </div>

          <h1>
            Comece sua jornada
            <br />
            de aprendizado.
          </h1>

          <p>
            Crie sua conta gratuitamente e tenha
            acesso a conteúdos e atividades
            educacionais.
          </p>

          <div className="auth-benefits">

            <div>
              <span>✓</span>
              Aprenda no seu ritmo
            </div>

            <div>
              <span>✓</span>
              Acompanhe seu progresso
            </div>

            <div>
              <span>✓</span>
              Desenvolva novas habilidades
            </div>

          </div>

        </div>

      </section>

      {/* LADO DIREITO */}
      <section className="auth-container">

        <div className="auth-card">

          {/* LOGO MOBILE */}
          <div className="auth-mobile-logo">
            <strong>
              Aprender<span>+</span>
            </strong>
          </div>

          {/* TÍTULO */}
          <div className="auth-title">

            <span>CRIAR CONTA</span>

            <h2>Comece a aprender</h2>

            <p>
              Crie sua conta para acessar
              a plataforma Aprender+.
            </p>

          </div>

          {/* ERRO */}
          {erro && (
            <div className="auth-error">
              <span>⚠️</span>
              <p>{erro}</p>
            </div>
          )}

          {/* SUCESSO */}
          {sucesso && (
            <div className="auth-success">
              <span>✓</span>
              <p>{sucesso}</p>
            </div>
          )}

          {/* FORMULÁRIO */}
          <form onSubmit={handleSubmit}>

            {/* NOME */}
            <div className="auth-field">

              <label htmlFor="cadastro-nome">
                Nome completo
              </label>

              <div className="auth-input-wrapper">

                <span>👤</span>

                <input
                  id="cadastro-nome"
                  type="text"
                  value={nome}
                  onChange={(event) =>
                    setNome(event.target.value)
                  }
                  placeholder="Digite seu nome completo"
                  autoComplete="name"
                  minLength={3}
                  required
                />

              </div>

            </div>

            {/* EMAIL */}
            <div className="auth-field">

              <label htmlFor="cadastro-email">
                E-mail
              </label>

              <div className="auth-input-wrapper">

                <span>✉</span>

                <input
                  id="cadastro-email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="seu@email.com"
                  autoComplete="email"
                  required
                />

              </div>

            </div>

            {/* SENHA */}
            <div className="auth-field">

              <label htmlFor="cadastro-senha">
                Senha
              </label>

              <div className="auth-input-wrapper">

                <span>🔒</span>

                <input
                  id="cadastro-senha"
                  type="password"
                  value={senha}
                  onChange={(event) =>
                    setSenha(event.target.value)
                  }
                  placeholder="Mínimo de 6 caracteres"
                  autoComplete="new-password"
                  minLength={6}
                  required
                />

              </div>

            </div>

            {/* CONFIRMAÇÃO */}
            <div className="auth-field">

              <label htmlFor="cadastro-confirmar">
                Confirmar senha
              </label>

              <div className="auth-input-wrapper">

                <span>🔐</span>

                <input
                  id="cadastro-confirmar"
                  type="password"
                  value={confirmarSenha}
                  onChange={(event) =>
                    setConfirmarSenha(
                      event.target.value
                    )
                  }
                  placeholder="Digite a senha novamente"
                  autoComplete="new-password"
                  required
                />

              </div>

            </div>

            {/* BOTÃO */}
            <button
              className="auth-submit"
              type="submit"
              disabled={carregando}
            >

              {carregando ? (
                <>
                  <span className="auth-spinner"></span>
                  Criando conta...
                </>
              ) : (
                <>
                  Criar minha conta
                  <span>→</span>
                </>
              )}

            </button>

          </form>

          {/* DIVISOR */}
          <div className="auth-divider">
            <span>ou</span>
          </div>

          {/* LOGIN */}
          <p className="auth-register">

            Já possui uma conta?

            <Link to="/login">
              Entrar
            </Link>

          </p>

          <small className="auth-footer">
            Aprender+ • Educação de qualidade
          </small>

        </div>

      </section>

    </main>
  );
}

export default Cadastro;

