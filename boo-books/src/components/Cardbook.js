import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Para agregar algunos estilos personalizados

const App = () => {
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    // Llamada a la API para obtener los libros
    const obtenerLibros = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/librosdb/libros');
        setLibros(response.data);
      } catch (error) {
        console.error("Error al obtener los libros:", error);
      }
    };

    obtenerLibros();
  }, []);

  return (
    <div className="container">
      <h1>Lista de Libros</h1>
      <div className="libros-grid">
        {libros.map((libro) => (
          <div key={libro._id} className="libro-card">
            <img src={libro.imagen} alt={libro.nombre} className="libro-imagen" />
            <h2>{libro.nombre}</h2>
            <p><strong>Autor:</strong> {libro.autor}</p>
            <p><strong>ISBN:</strong> {libro.isbn}</p>
            <p><strong>Publicación:</strong> {libro.publicacion}</p>
            <p><strong>Género:</strong> {libro.genero}</p>
            <p><strong>Cantidad disponible:</strong> {libro.cantidadDisponible}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;