import React from "react";
import Navbar from "../components/Navbar";
import { Outlet, Route, Routes, useNavigate} from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
      <Navbar isAdmin={true} />  
      <div>
        <h1>Panel de Administración</h1>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          
        </div>
      </div>
      <Outlet />  
    </div>
  

  );
};

export default AdminDashboard;
