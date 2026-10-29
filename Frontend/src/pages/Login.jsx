import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/auth.css"

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const { login, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    setErro("");
    setCarregando(true);

    try {
      const usuario = await login(email, senha);

      console.log("Usuário autenticado:", usuario);
      console.log("Perfil:", usuario.perfil);

      if (usuario.perfil === "ADMIN") {
        navigate("/admin");
      } else if (usuario.perfil === "PROFESSOR") {
        navigate("/professor");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Erro no login:", error);

      setErro(
        error.response?.data?.erro ||
          "E-mail ou senha inválidos."
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="auth-page">

      <section className="auth-hero">
        <div className="auth-hero-content">

          <div className="auth-logo">
            <span>+</span>
            Aprender
          </div>

          <h1>
            Aprenda hoje.
            <br />
            Transforme seu amanhã.
          </h1>

          <p>
            Uma plataforma educacional criada para
            tornar o aprendizado mais simples,
            acessível e conectado.
          </p>

          <div className="auth-benefits">
            <div>
              <span>✓</span>
              Conteúdos educacionais
            </div>

            <div>
              <span>✓</span>
              Atividades interativas
            </div>

            <div>
              <span>✓</span>
              Acompanhamento do progresso
            </div>
          </div>

        </div>
      </section>

      <section className="auth-container">

        <div className="auth-card">

          <div className="auth-mobile-logo">
            <strong>Aprender<span>+</span></strong>
          </div>

          <div className="auth-title">
            <span>SEJA BEM-VINDO</span>

            <h2>Entrar na plataforma</h2>

            <p>
              Acesse sua conta para continuar
              aprendendo.
            </p>
          </div>

          {erro && (
            <div className="auth-error">
              <span>⚠️</span>
              <p>{erro}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="auth-field">

              <label htmlFor="email">
                E-mail
              </label>

              <div className="auth-input-wrapper">
                <span>✉</span>

                <input
                  id="email"
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

            <div className="auth-field">

              <label htmlFor="senha">
                Senha
              </label>

              <div className="auth-input-wrapper">
                <span>🔒</span>

                <input
                  id="senha"
                  type="password"
                  value={senha}
                  onChange={(event) =>
                    setSenha(event.target.value)
                  }
                  placeholder="Digite sua senha"
                  autoComplete="current-password"
                  required
                />
              </div>

            </div>

            <button
              className="auth-submit"
              type="submit"
              disabled={carregando}
            >
              {carregando ? (
                <>
                  <span className="auth-spinner"></span>
                  Entrando...
                </>
              ) : (
                <>
                  Entrar
                  <span>→</span>
                </>
              )}
            </button>

          </form>

          <div className="auth-divider">
            <span>ou</span>
          </div>

          <p className="auth-register">
            Ainda não possui uma conta?
            <Link to="/cadastro">
              Criar minha conta
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

export default Login;