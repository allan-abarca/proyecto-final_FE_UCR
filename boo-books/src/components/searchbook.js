import React, { useState } from 'react';
import axios from 'axios';
import Library from './Library';  // Importa el componente que usas para mostrar los libros

const SearchBooks = () => { 
  const [searchTerm, setSearchTerm] = useState({ nombre: '', autor: '', genero: '' });
  const [books, setBooks] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/libros', {
        params: {
          nombre: searchTerm.nombre,
          autor: searchTerm.autor,
          genero: searchTerm.genero,
        },
      });
      setBooks(response.data);
    } catch (error) {
      console.error('Error al buscar libros:', error);
    }
  };

  const takeLibro = async (bookId) => {
    // Lógica para tomar el libro
  };

  const returnLibro = async (bookId) => {
    // Lógica para devolver el libro
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchTerm.nombre}
          onChange={(e) => setSearchTerm({ ...searchTerm, nombre: e.target.value })}
        />
        <input
          type="text"
          placeholder="Buscar por autor"
          value={searchTerm.autor}
          onChange={(e) => setSearchTerm({ ...searchTerm, autor: e.target.value })}
        />
        <input
          type="text"
          placeholder="Buscar por género"
          value={searchTerm.genero}
          onChange={(e) => setSearchTerm({ ...searchTerm, genero: e.target.value })}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      <Library books={books} takeLibro={takeLibro} returnLibro={returnLibro} />
    </div>
  );
};

export default SearchBooks;
