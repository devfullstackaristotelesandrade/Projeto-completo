import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function PrivateRoute({ children }) {
  const { autenticado, carregando } = useAuth();

  if (carregando) {
    return <p>Carregando...</p>;
  }

  if (!autenticado) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;