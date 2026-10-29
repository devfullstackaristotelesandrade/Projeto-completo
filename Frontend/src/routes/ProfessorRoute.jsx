import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProfessorRoute({ children }) {
  const { usuario, carregando } = useAuth();

  if (carregando) {
    return <p>Carregando...</p>;
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (
    usuario.perfil !== "PROFESSOR" &&
    usuario.perfil !== "ADMIN"
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProfessorRoute;