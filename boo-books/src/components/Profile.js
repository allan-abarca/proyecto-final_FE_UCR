import React from "react";

const Profile = ()=>{
    return(
        <div style={{display: "flex"}}>
            <div style={{flex: 1}}>
                <img src="https://example.com/user-profile.jpg" alt="Foto de usuario" style={{width: "100px"}}/>
            </div>
            <div style={{flex: 1}}>
                <h3>Nombre: Pepe Pérez</h3>
                <p>ID: 12345</p>
                <p>Contacto: pepe.perez@ejemplo.com</p>
            </div>
        </div>
    );
};

export default Profile;