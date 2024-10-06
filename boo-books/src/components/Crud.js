import React, { useState, useEffect } from "react";
import axios from "axios";
import './Crud.css'; 
import AdminLibros from "./adminLibros";
import AdminUsers from "./adminUsers";

const Crud = () => {
    
    return (
        <div className="crud-container">
            
            <div classname="AdminBooks" style={{ display: 'flex', justifyContent: 'space-around' }}>
            <AdminLibros/>
            </div>
            <div classname="AdminUsers" style={{ display: 'flex', justifyContent: 'space-around' }}>
            <AdminUsers/>
            </div>
            
        </div>
    );
};

export default Crud;
