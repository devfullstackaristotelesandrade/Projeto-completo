import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

 useEffect(() => {
  async function carregarUsuario() {
    const token = localStorage.getItem("token");

    if (!token) {
      setCarregando(false);
      return;
    }

    try {
      const response = await api.get("/users/me");

      console.log(
        "✅ Usuário autenticado:",
        response.data.usuario
      );

      setUsuario(response.data.usuario);

      localStorage.setItem(
        "usuario",
        JSON.stringify(response.data.usuario)
      );

    } catch (error) {

      console.error(
        "❌ Erro /users/me:",
        error.response?.status,
        error.response?.data || error.message
      );

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        setUsuario(null);
      } else {
        const usuarioSalvo = localStorage.getItem("usuario");

        if (usuarioSalvo) {
          setUsuario(JSON.parse(usuarioSalvo));
        }
      }

    } finally {
      setCarregando(false);
    }
  }

  carregarUsuario();
}, []);
  async function login(email, senha) {
    const response = await api.post("/auth/login", {
      email,
      senha
    });

    const { token, usuario } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));

    setUsuario(usuario);

    return usuario;
  }

  async function cadastro(nome, email, senha) {
    const response = await api.post("/auth/register", {
      nome,
      email,
      senha
    });

    return response.data;
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setUsuario(null);
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        login,
        cadastro,
        logout,
        carregando,
        autenticado: !!usuario
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}