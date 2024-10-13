import React, { useState, useEffect } from "react";
import axios from "axios";

const Library = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem('userId');  // Obtener el userId del localStorage

  // Función para obtener libros con el término de búsqueda
  const fetchBooks = async (term = "") => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (term) {
        params.nombre = term; // Puedes ajustar para buscar por autor o género también
      }

      const response = await axios.get("http://localhost:5000/api/libros", { params });
      setBooks(response.data);
    } catch (err) {
      setError("Hubo un error al buscar los libros. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      fetchBooks();
    }
  }, [searchTerm]);

  const handleSearchClick = () => {
    fetchBooks(searchTerm);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    fetchBooks();
  };

  const takeLibro = async (libroId) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/libros/take/${libroId}`, { userId });
      // Actualiza el estado de los libros después de tomar uno
      setBooks(books.map(book => book._id === libroId ? response.data : book));
      alert("Libro tomado exitosamente");
    } catch (error) {
      console.error("Error al tomar el libro:", error.response ? error.response.data : error.message);
      alert(error.response ? error.response.data.message : "Error al tomar el libro");
    }
  };

  const returnLibro = async (libroId) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/libros/return/${libroId}`, { userId });
      // Actualiza el estado de los libros después de devolver uno
      setBooks(books.map(book => book._id === libroId ? response.data : book));
      alert("Libro devuelto exitosamente");
    } catch (error) {
      console.error("Error al devolver el libro:", error.response ? error.response.data : error.message);
      alert(error.response ? error.response.data.message : "Error al devolver el libro");
    }
  };

  return (
    <div>
      <h1>Biblioteca de Libros</h1>
      <input
        type="text"
        placeholder="Buscar por nombre, autor o género..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearchClick} disabled={loading}>
        {loading ? "Buscando..." : "Buscar"}
      </button>
      <button onClick={handleClearSearch}>Mostrar todos</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading ? (
        <p>Cargando libros...</p>
      ) : books.length > 0 ? (
        <ul>
          {books.map((libro) => (
            <li key={libro._id}>
              <h3>{libro.nombre}</h3>
              <img
                src={libro.imagen}
                alt={libro.nombre}
                style={{ width: "150px", height: "200px" }}
              />
              <p>Autor: {libro.autor}</p>
              <p>Género: {libro.genero}</p>
              <p>Cantidad Disponible: {libro.cantidadDisponible}</p>
              {libro.cantidadDisponible > 0 ? (
                <button onClick={() => takeLibro(libro._id)}>Tomar Libro</button>
              ) : (
                <p style={{ color: "red" }}>No disponible</p>
              )}
              <button onClick={() => returnLibro(libro._id)}>Devolver Libro</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron libros.</p>
      )}
    </div>
  );
};

export default Library;
