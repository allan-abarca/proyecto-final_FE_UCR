import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);  // Estado para controlar qué usuario está siendo editado
  const [newUser, setNewUser] = useState({
    nombre: '',
    email: '',
    password: '',
    role: 'normal'
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  // Eliminar un usuario
  const deleteUser = (id) => {
    axios.delete(`http://localhost:5000/api/users/${id}`)
      .then(() => setUsers(users.filter(user => user._id !== id)))
      .catch(error => console.error(error));
  };

  // Crear un nuevo usuario
  const createUser = () => {
    axios.post('http://localhost:5000/api/users', newUser)
      .then(response => {
        setUsers([...users, response.data]);
        setShowCreateForm(false);  // Ocultar el formulario después de crear el usuario
        setNewUser({ nombre: '', email: '', password: '', role: 'normal' });  // Resetear el formulario
      })
      .catch(error => console.error(error));
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  // Manejar inicio de la edición
  const startEdit = (user) => {
    setEditingUser(user._id);  // Establecer el usuario que está siendo editado
    setNewUser({
      nombre: user.nombre,
      email: user.email,
      password: '',  // Dejar vacío si no deseas cambiar la contraseña
      role: user.role
    });
  };

  // Actualizar un usuario
  const updateUser = (id) => {
    axios.put(`http://localhost:5000/api/users/${id}`, newUser)
      .then(response => {
        setUsers(users.map(user => (user._id === id ? response.data : user)));
        setEditingUser(null);  // Salir del modo de edición
        setNewUser({ nombre: '', email: '', password: '', role: 'normal' });  // Resetear el formulario
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Gestión de Usuarios</h1>

      {/* Botón para mostrar el formulario de creación de usuario */}
      <button onClick={() => setShowCreateForm(!showCreateForm)}>
        {showCreateForm ? 'Cancelar' : 'Crear Usuario'}
      </button>

      {/* Formulario de creación de usuario */}
      {showCreateForm && (
        <div>
          <h2>Crear Nuevo Usuario</h2>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={newUser.nombre}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newUser.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={newUser.password}
            onChange={handleInputChange}
          />
          <select
            name="role"
            value={newUser.role}
            onChange={handleInputChange}
          >
            <option value="normal">Normal</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={createUser}>Guardar</button>
        </div>
      )}

      
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {editingUser === user._id ? (
              <div>
                
                <input
                  type="text"
                  name="nombre"
                  value={newUser.nombre}
                  onChange={handleInputChange}
                />
                <input
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Nueva Contraseña"
                  value={newUser.password}
                  onChange={handleInputChange}
                />
                <select
                  name="role"
                  value={newUser.role}
                  onChange={handleInputChange}
                >
                  <option value="normal">Normal</option>
                  <option value="admin">Admin</option>
                </select>
                <button onClick={() => updateUser(user._id)}>Guardar Cambios</button>
                <button onClick={() => setEditingUser(null)}>Cancelar</button>
              </div>
            ) : (
              <div className="bookList">
                {user.nombre} - {user.email} ({user.role})
                  
                  <div className="buttons">
                    <button onClick={() => startEdit(user)}>Editar</button>
                    <button onClick={() => deleteUser(user._id)}>Eliminar</button>
                  </div>
              
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUsers;
