import React, { useState, useEffect } from "react";
import axios from "axios";
import Books from "./searchbook";

const Library = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Función para obtener libros según el término de búsqueda
  const fetchBooks = async () => {
    try {
      const response = await axios.get('/api/libros', { params: { search: searchTerm } });
        setBooks(response.data);
    } catch (error) {
        console.error('Error al buscar libros:', error);
    }
};


  // Ejecutar la búsqueda cuando se hace clic en el botón
  const handleSearchClick = () => {
    fetchBooks();
  };

  // Obtener todos los libros cuando el componente se monta por primera vez
  useEffect(() => {
    fetchBooks(); // Cargar todos los libros al inicio
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar libro..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Actualizar el searchTerm
      />
      <button onClick={handleSearchClick}>Buscar</button> {/* Botón para buscar */}
      
      {/* Pasar libros y searchTerm como props al componente Books */}
      <Books books={books} searchTerm={searchTerm} />
    </div>
  );
};

export default Library;
