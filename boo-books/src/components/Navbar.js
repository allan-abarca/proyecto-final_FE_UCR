import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import './Navbar.css'; // Asegúrate de que el CSS está enlazado

const Navbar = ({ isAdmin }) => {
    return (
        <nav className="navbar">
            <ul>
                {isAdmin ? (
                    <>
                        {/* Enlaces para el admin */}
                        <li><Link to="/admin/crud">CRUD</Link></li>
                        <li><Link to="/admin/library">Biblioteca</Link></li>
                        <li><Link to="/admin/profile">Perfil</Link></li>
                        <li><Link to="/admin/accessibility">Accesibilidad</Link></li>
                        <li><LogoutButton /></li>
                    </>
                ) : (
                    <>
                        {/* Enlaces para el usuario normal */}
                        <li><Link to="/user/library">Biblioteca</Link></li>
                        <li><Link to="/user/profile">Perfil</Link></li>
                        <li><Link to="/user/accessibility">Accesibilidad</Link></li>
                        <li><LogoutButton /></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
