import React from "react";
import AdminLibros from "../components/adminLibros";
import AdminUsers from "../components/adminUsers";    
import Navbar from "../components/Navbar";
import { Outlet, Route, Routes, useNavigate} from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
      <Navbar isAdmin={true} />  {/* Menú de navegación con rol de administrador */}
      <div>
        <h1>Panel de Administración</h1>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {/* <AdminLibros />   
          <AdminUsers />     */}
        </div>
      </div>
      <Outlet />  {/* Rutas adicionales si las necesitas */}
    </div>
  

  );
};

export default AdminDashboard;
