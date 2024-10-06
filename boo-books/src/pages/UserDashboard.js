import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const UserDashboard = () => {
  const [libros, setLibros] = useState([]);

  // Obtener los libros disponibles al cargar el componente
  useEffect(() => {
    axios.get("http://localhost:5000/api/libros")  // Cambia la URL según tu configuración
      .then(response => setLibros(response.data))
      .catch(error => console.error(error));
  }, []);

  // Tomar un libro (disminuir cantidad)
  const takeLibro = (id) => {
    axios.post(`http://localhost:5000/api/libros/take/${id}`)
      .then(response => {
        // Actualizar la lista de libros localmente
        setLibros(libros.map(libro =>
          libro._id === id ? response.data : libro
        ));
      })
      .catch(error => {
        console.error(error);
        alert('No hay más copias disponibles');
      });
  };
  const returnLibro = (id) => {
    axios.post(`http://localhost:5000/api/libros/return/${id}`)
      .then(response => {
        // Actualizar la lista de libros localmente
        setLibros(libros.map(libro =>
          libro._id === id ? response.data : libro
        ));
      })
      .catch(error => {
        console.error(error);
        alert('No hay más copias disponibles');
      });
  };

  return (
    <div>
      <Navbar isAdmin={false} />
      <h1>Libros Disponibles</h1>
      <div>
        {libros.map(libro => (
          <div className='b'key={libro._id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc' }}>
            <h3>{libro.nombre}</h3>
            <p> <img src={libro.imagen} alt={libro.nombre} style={{ width: '150px', height: '200px' }} /></p>
            <p>Autor: {libro.autor}</p>
            <p>Género: {libro.genero}</p>
            <p>Cantidad Disponible: {libro.cantidadDisponible}</p>

           
            {libro.cantidadDisponible > 0 ? (
              <button onClick={() => takeLibro(libro._id)}>                
                Tomar Libro
              </button>
            ) : (
              <p style={{ color: 'red' }}>No disponible</p>
            )}
            <button onClick={() => returnLibro(libro._id)}>Devolver Libro</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
