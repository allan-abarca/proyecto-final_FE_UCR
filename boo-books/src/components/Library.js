import React, { useState, useEffect } from "react";
import axios from "axios";

const Library = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Estado para manejar errores

  // Función para obtener libros con el término de búsqueda
  const fetchBooks = async () => {
    setLoading(true);
    setError(null); // Resetear el error
    try {
      const response = await axios.get('/api/libros', { params: { nombre: searchTerm } });
      setBooks(response.data); 
    } catch (err) {
      setError('Hubo un error al buscar los libros. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  // Ejecutar la búsqueda cuando el componente se monta por primera vez
  useEffect(() => {
    fetchBooks(); 
  }, []);

  // Manejar el clic de búsqueda
  const handleSearchClick = () => {
    if (searchTerm.trim() !== "") {
      fetchBooks();
    } else {
      alert("Introduce un término de búsqueda");
    }
  };

  // Manejar la búsqueda con la tecla "Enter"
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };
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

  return (
    <div>
      <h1>Biblioteca de Libros</h1>

      {/* Campo de búsqueda */}
      <input
        type="text"
        placeholder="Buscar Libro, Genero o Autor...."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} 
        onKeyDown={handleKeyDown} // Agregar búsqueda con "Enter"
      />
      <button onClick={handleSearchClick}>Buscar</button>

      {/* Mostrar errores */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Mostrar carga mientras se obtienen los datos */}
      {loading ? (
        <p>Cargando libros...</p>
      ) : (
        <ul>
          {books.map((libro) => (
            <li key={libro._id}>
              <h3>{libro.nombre}</h3>
              <img src={libro.imagen} alt={libro.nombre} style={{ width: '150px', height: '200px' }} />
              <p>Autor: {libro.autor}</p>
              <p>Género: {libro.genero}</p>
              <p>Cantidad Disponible: {libro.cantidadDisponible}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Library;
