import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminLibros = () => {
  const [libros, setLibros] = useState([]);

  // Obtener todos los libros al cargar el componente
  useEffect(() => {
    axios.get("/api/libros")
      .then((response) => setLibros(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Eliminar un libro
  const deleteLibro = (id) => {
    axios.delete(`/api/libros/${id}`)
      .then(() => setLibros(libros.filter((libro) => libro._id !== id)))
      .catch((error) => console.error(error));
  };

  // Actualizar un libro
  const updateLibro = (id, updatedLibro) => {
    axios.put(`/api/libros/${id}`, updatedLibro)
      .then((response) => setLibros(libros.map((libro) => (libro._id === id ? response.data : libro))))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Gestión de Libros</h1>
      <ul>
        {libros.map((libro) => (
          <li key={libro._id}>
            {libro.nombre} - {libro.autor} ({libro.genero})
            <button onClick={() => deleteLibro(libro._id)}>Eliminar</button>
            <button onClick={() => updateLibro(libro._id, { nombre: libro.nombre, autor: libro.autor, genero: libro.genero })}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminLibros;
