import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Dashboard from "./pages/Dashboard";
import Conteudos from "./pages/Conteudos";
import Atividades from "./pages/Atividades";

import MainLayout from "./layouts/MainLayout";
import PrivateRoute from "./routes/PrivateRoute";
import ConteudoDetalhes from "./pages/ConteudoDetalhes";
import AtividadeDetalhes from "./pages/AtividadeDetalhes";
import Progresso from "./pages/Progresso";

import ProfessorRoute from "./routes/ProfessorRoute";
import ProfessorDashboard from "./pages/ProfessorDashboard";
import ProfessorConteudoForm from "./pages/ProfessorConteudoForm";
import ProfessorAtividadeForm from "./pages/ProfessorAtividadeForm";
import RoleRoute from "./routes/RoleRoute";

import AdminRoute from "./routes/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsuarios from "./pages/AdminUsuarios";
import AdminConteudos from "./pages/AdminConteudos";
import AdminAtividades from "./pages/AdminAtividades";
import AdminLayout from "./layouts/AdminLayout";


function App() {
  return (
    <BrowserRouter>

      <AuthProvider>

        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/cadastro" element={<Cadastro />} />

          <Route
            element={
              <PrivateRoute>
                <MainLayout />
              </PrivateRoute>
            }
          >
            <Route
              path="/dashboard"
              element={
              <RoleRoute roles={["ALUNO"]}>
             <Dashboard />
             </RoleRoute>
             }
            />

   
            <Route
              path="/conteudos"
              element={<Conteudos />}
            />

            <Route
              path="/atividades"
              element={<Atividades />}
            />

            <Route
              path="/conteudos/:id"
              element={<ConteudoDetalhes />}
            />

            <Route
              path="/atividades/:id"
              element={<AtividadeDetalhes />}
            />

            <Route 
               path="/progresso"
               element={<Progresso />}
             />

          </Route>

          <Route

            element={
             <ProfessorRoute>
             <MainLayout />
              </ProfessorRoute>
            
            }
          >

          <Route
           path="/professor"
           element={<ProfessorDashboard />}
          />

          <Route
           path="/professor/conteudos/novo"
           element={<ProfessorConteudoForm />}
          />

          <Route
            path="/professor/conteudos/:id/atividades"
            element={<ProfessorAtividadeForm />}
          />

           </Route>
          <Route
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/usuarios" element={<AdminUsuarios />} />
            <Route path="/admin/conteudos" element={<AdminConteudos />} />
            <Route path="/admin/atividades" element={<AdminAtividades />} />
          </Route>

        </Routes>

      </AuthProvider>

    </BrowserRouter>
  );
}

export default App;