import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const AdminDashboard = ()=>{
    return(
        <div>
            <Navbar isAdmin={true}/>
            <Outlet/>
        </div>
    );
};

export default AdminDashboard;