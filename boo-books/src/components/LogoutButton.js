import React from "react";
import { useNavigate } from "react-router-dom";
import './LogoutButton.css';

const LogoutButton = () => {
    const navigate = useNavigate(); // Hook para redirigir

    const handleLogout = () => {
        // Eliminar datos de usuario del localStorage
        localStorage.removeItem("user");
        localStorage.removeItem("admin");

        // Redirigir a la página de login
        navigate("/login");
    };

    return (
        <button onClick={handleLogout} className="logout-button">
            Cerrar sesión
        </button>
    );
};

export default LogoutButton;

