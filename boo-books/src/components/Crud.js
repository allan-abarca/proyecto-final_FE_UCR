import React, {useState, useEffect} from "react";
import axios from "axios";

const Crud = ()=>{
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        axios.get("/api/users")
        .then(response => setUsers(response.data))
        .catch(error => console.error(error));
    }, []);

    const handleDelete = (userId)=>{
        axios.delete(`/api/users/${userId}`)
        .then(()=>{
            setUsers(users.filter(user => user._id !== userId));
        })
        .catch(error => console.error(error));
    };

    return(
        <div>
            <h3>CRUD de usuarios</h3>
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        {user.nombre} <button onClick={() => handleDelete(user._id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Crud;