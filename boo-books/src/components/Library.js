import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Library.css"; // Asegúrate de importar tu CSS

const Library = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem('userId'); // Obtener el userId del localStorage

  // Función para obtener libros con el término de búsqueda
  const fetchBooks = async (term = "") => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (term) {
        params.nombre = term; // Buscar por nombre
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
      setBooks(books.map(book => book._id === libroId ? response.data : book));
      alert("Libro devuelto exitosamente");
    } catch (error) {
      console.error("Error al devolver el libro:", error.response ? error.response.data : error.message);
      alert(error.response ? error.response.data.message : "Error al devolver el libro");
    }
  };

  return (
    <div className="library-container">
      <h1 className="library-header">Biblioteca de Libros</h1>
      <div className="library-search">
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
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading ? (
        <p>Cargando libros...</p>
      ) : books.length > 0 ? (
        <div className="library-content">
          {books.map((libro) => (
            <div className="book-item" key={libro._id}>
              <img
                src={libro.imagen}
                alt={libro.nombre}
                className="book-image"
              />
              <div className="book-details">
                <h3>{libro.nombre}</h3>
                <p>Autor: {libro.autor}</p>
                <p>Género: {libro.genero}</p>
                <p>
                  Cantidad Disponible: 
                  <span style={{ color: libro.cantidadDisponible > 0 ? "green" : "red" }}>
                    {libro.cantidadDisponible}
                  </span>
                </p>
                <p>ISBN: {libro.isbn}</p> {/* Mostrar el ISBN */}
                {libro.cantidadDisponible > 0 ? (
                  <button onClick={() => takeLibro(libro._id)}>Tomar Libro</button>
                ) : (
                  <button disabled>No disponible</button>
                )}
                <button onClick={() => returnLibro(libro._id)}>Devolver Libro</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No se encontraron libros.</p>
      )}
    </div>
  );
};

export default Library;
