import { Outlet } from "react-router-dom";
import AdminNav from "../components/AdminNav";

function AdminLayout() {
  return (
    <div className="admin-app-layout">
      <AdminNav />
      <main className="admin-main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
