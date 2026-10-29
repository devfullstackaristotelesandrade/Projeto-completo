import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function AdminRoute({ children }) {
  const { usuario, carregando } = useAuth();

  if (carregando) {
    return <p>Carregando...</p>;
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (usuario.perfil !== "ADMIN") {
    if (usuario.perfil === "PROFESSOR") {
      return <Navigate to="/professor" replace />;
    }

    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default AdminRoute;