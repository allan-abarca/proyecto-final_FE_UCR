import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = ()=>{
    const navigate = useNavigate();

    const handleLogout = ()=>{
        localStorage.removeItem("user");
        localStorage.removeItem("admin");

        navigate("/login");
    };

    return(
        <button onClick={handleLogout} style={{padding: "10px", margin: "10px"}}>
            Cerrar sesión
        </button>
    );
};

export default LogoutButton;