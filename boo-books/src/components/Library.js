import React, { useState, useEffect } from "react";
import axios from "axios";
import Books from "./searchbook"; // Este componente puede ser el que renderiza cada libro

const Library = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Obtener libros según el término de búsqueda
  const fetchBooks = async () => {
    try {
      const response = await axios.get('/api/libros', { params: { search: searchTerm } });
      setBooks(response.data);
    } catch (error) {
      console.error('Error al buscar libros:', error);
    }
  };

  // Obtener todos los libros al montar el componente
  useEffect(() => {
    fetchBooks(); // Cargar todos los libros al inicio
  }, []);

  // Tomar un libro (disminuir cantidad)
  const takeLibro = (id) => {
    axios.post(`http://localhost:5000/api/libros/take/${id}`)
      .then(response => {
        // Actualizar la lista de libros localmente
        setBooks(books.map(book =>
          book._id === id ? response.data : book
        ));
      })
      .catch(error => {
        console.error(error);
        alert('No hay más copias disponibles');
      });
  };

  // Devolver un libro (aumentar cantidad)
  const returnLibro = (id) => {
    axios.post(`http://localhost:5000/api/libros/return/${id}`)
      .then(response => {
        // Actualizar la lista de libros localmente
        setBooks(books.map(book =>
          book._id === id ? response.data : book
        ));
      })
      .catch(error => {
        console.error(error);
        alert('Error al devolver el libro');
      });
  };

  // Ejecutar la búsqueda cuando se hace clic en el botón
  const handleSearchClick = () => {
    fetchBooks();
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar libro..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Actualizar el searchTerm
      />
      <button onClick={handleSearchClick}>Buscar</button> {/* Botón para buscar */}
      
      {/* Renderizar la lista de libros */}
      <Books books={books} takeLibro={takeLibro} returnLibro={returnLibro} />
    </div>
  );
};

export default Library;
