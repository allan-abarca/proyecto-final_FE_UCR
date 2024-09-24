import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const UserDashborad = ()=>{
    return(
        <div>
            <Navbar isAdmin={false}/>
            <Outlet/>
        </div>
    );
};

export default UserDashborad;