import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const Navbar = ({isAdmin})=>{
    return(
        <nav>
            <ul>
                {isAdmin ? (
                    <>
                        <li><Link to="/admin/crud">CRUD</Link></li>
                        <li><Link to="/admin/library">Biblioteca</Link></li>
                        <li><Link to="/admin/profile">Perfil</Link></li>
                        <li><Link to="/admin/accessibility">Accesibilidad</Link></li>
                        <li><LogoutButton/></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/user/library">Biblioteca</Link></li>
                        <li><Link to="/user/profile">Perfil</Link></li>
                        <li><Link to="/user/accessibility">Accesibilidad</Link></li>
                        <li><LogoutButton/></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;