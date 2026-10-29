import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function AdminNav() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <nav className="admin-nav">
      <div className="admin-nav-brand">
        <strong>Aprender<span>+</span></strong>
        <small>Painel Administrativo</small>
      </div>

      <div className="admin-nav-links">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            isActive ? "admin-nav-link active" : "admin-nav-link"
          }
        >
          📊 Dashboard
        </NavLink>

        <NavLink
          to="/admin/usuarios"
          className={({ isActive }) =>
            isActive ? "admin-nav-link active" : "admin-nav-link"
          }
        >
          👥 Usuários
        </NavLink>

        <NavLink
          to="/admin/conteudos"
          className={({ isActive }) =>
            isActive ? "admin-nav-link active" : "admin-nav-link"
          }
        >
          📚 Conteúdos
        </NavLink>

        <NavLink
          to="/admin/atividades"
          className={({ isActive }) =>
            isActive ? "admin-nav-link active" : "admin-nav-link"
          }
        >
          📝 Atividades
        </NavLink>
      </div>

      <div className="admin-nav-actions">
        <button
          type="button"
          className="admin-logout-button"
          onClick={handleLogout}
        >
          🚪 Sair
        </button>
      </div>
    </nav>
  );
}

export default AdminNav;