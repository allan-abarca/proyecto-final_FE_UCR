import React from "react";

import './Crud.css'; 
import AdminLibros from "./adminLibros";
import AdminUsers from "./adminUsers";

const Crud = () => {
    
    return (
        <div className="crud-container">
            
            <div classname="AdminBooks">
            <AdminLibros/>
            </div>
            <div classname="AdminUsers">
            <AdminUsers/>
            </div>
            
        </div>
    );
};

export default Crud;
