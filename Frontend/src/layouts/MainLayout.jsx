import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function MainLayout() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="app-layout">

      <aside className="sidebar">

        <div className="logo">
          <h2>Aprender+</h2>
          <span>Educação de Qualidade</span>
        </div>

        <nav>

           {usuario?.perfil === "ALUNO" && (
         
          <NavLink to="/dashboard">
            📊 Dashboard
          </NavLink>
         
        )}

      

          <NavLink to="/conteudos">
            📚 Conteúdos
          </NavLink>

          <NavLink to="/atividades">
            📝 Atividades
          </NavLink>
          
          <NavLink to="/progresso">
            📈 Meu progresso
          </NavLink>

          {(usuario?.perfil === "PROFESSOR" ||
  usuario?.perfil === "ADMIN") && (
        <>
           <NavLink to="/professor">
            👨‍🏫 Área do Professor
           </NavLink>
        </>
          )}
      
        {usuario?.perfil === "ADMIN" && (
        <NavLink to="/admin">
          🛠️ Administração
          </NavLink>
        )}


        </nav>

        <div className="sidebar-bottom">

          <div className="usuario">

            <strong>
              {usuario?.nome}
            </strong>

            <small>
              {usuario?.perfil}
            </small>
           
            <button type="button"className="admin-logout-button"onClick={handleLogout}>
              🚪 Sair
            </button>
            
          </div>

         
        </div>

      </aside>

      <main className="main-content">
        <Outlet />
      </main>


    </div>
  );
}

export default MainLayout;