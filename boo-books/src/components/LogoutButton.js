import React from "react";
import { useNavigate } from "react-router-dom";

// Este componente crea un botón para cerrar sesión.
const LogoutButton = () => {
    // `useNavigate` permite redirigir al usuario a otra página.
    const navigate = useNavigate();

    // Función que se ejecuta cuando el usuario hace clic en el botón de cerrar sesión.
    const handleLogout = () => {
        // Eliminamos el usuario del almacenamiento local para "desconectar" al usuario.
        localStorage.removeItem("user");
        // También eliminamos la información del administrador si la hay.
        localStorage.removeItem("admin");

        // Después de cerrar sesión, redirigimos al usuario a la página de login.
        navigate("/login");
    };

    return (
        <button onClick={handleLogout} style={{ padding: "10px", margin: "10px" }}>
            Cerrar sesión
        </button>
    );
};

export default LogoutButton;
