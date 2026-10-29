import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function RoleRoute({ children, roles }) {
  const { usuario, carregando } = useAuth();

  if (carregando) {
    return <p>Carregando...</p>;
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (!roles.includes(usuario.perfil)) {
    if (usuario.perfil === "PROFESSOR" ||
        usuario.perfil === "ADMIN") {
      return <Navigate to="/professor" replace />;
    }

    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default RoleRoute;