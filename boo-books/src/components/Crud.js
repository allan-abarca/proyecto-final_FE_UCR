import React from "react";
import './Crud.css'; 
import AdminLibros from "./adminLibros";
import AdminUsers from "./adminUsers";

const Crud = () => {
    return (
        <div className="crud-container">
            {/* Se corrige el uso de className */}
            <div className="AdminBooks">
                <AdminLibros />
            </div>
            <div className="AdminUsers">
                <AdminUsers />
            </div>
        </div>
    );
};

export default Crud;
