import React from "react";
import './Profile.css'; 
import profileImage from '../images/profile.jpg'; // Asegúrate de que la ruta sea correcta

const Profile = () => {
    return (
        <div className="profile-container">
            {/* Contenedor para la imagen de perfil */}
            <div className="profile-image">
                <img src={profileImage} alt="Foto de usuario" /> {/* Usar la imagen importada */}
            </div>
            {/* Contenedor para la información del perfil */}
            <div className="profile-info">
                <h3>Nombre: <span>Pepe Pérez</span></h3>
                <p>Centro educativo: <span>UCR</span></p>
                <p>ID: <span>12345</span></p>
                <p>Contacto: <span>pepe.perez@ejemplo.com</span></p>
                <p>Libros solicitados: <span>2</span></p>
            </div>
        </div>
    );
};

export default Profile;
