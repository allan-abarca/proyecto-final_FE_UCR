import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  const deleteUser = (id) => {
    axios.delete(`/api/users/${id}`)
      .then(() => setUsers(users.filter(user => user._id !== id)))
      .catch(error => console.error(error));
  };

  const updateUser = (id, updatedUser) => {
    axios.put(`/api/users/${id}`, updatedUser)
      .then(response => setUsers(users.map(user => (user._id === id ? response.data : user))))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Gestión de Usuarios</h1>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.email} ({user.role})
            <button onClick={() => deleteUser(user._id)}>Eliminar</button>
            <button onClick={() => updateUser(user._id, { email: user.email, role: user.role })}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUsers;

