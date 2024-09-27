import React, { useState, useEffect } from "react"; 
import axios from "axios"; // Importamos axios para hacer solicitudes HTTP.
import './Library.css'; 

const Library = () => { 
    // Estados: uno para almacenar los libros y otro para el término de búsqueda.
    const [books, setBooks] = useState([]); 
    const [searchTerm, setSearchTerm] = useState("");

    // Al cargar el componente, obtenemos los libros desde la API.
    useEffect(() => {
        axios.get("api/libros")
        .then(response => setBooks(response.data)) // Guardamos los libros obtenidos en el estado.
        .catch(error => console.error(error)); // Mostramos errores en la consola si algo falla.
    }, []); 

    return (
        <div className="library-container">
            {/* Encabezado de la biblioteca */}
            <div className="library-header">
                <h2>Biblioteca</h2>
            </div>

            {/* Campo de búsqueda que filtra libros según el nombre ingresado */}
            <div className="library-search">
                <input
                    type="text"
                    placeholder="Buscar libro..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)} // Actualizamos el estado con el valor de búsqueda ingresado.
                />
            </div>

            {/* Contenedor que muestra los libros en dos columnas */}
            <div className="library-content">
                {books
                    .filter(book => book.nombre.toLowerCase().includes(searchTerm.toLowerCase())) // Filtramos los libros según el término de búsqueda.
                    .map((book) => (
                        <div className="book-item" key={book._id}> 
                            {/* Columna para las imágenes de los libros */}
                            <img src={book.imagen} alt={book.nombre} /> 

                            {/* Columna para los detalles del libro */}
                            <div className="book-details">
                                <h3>{book.nombre}</h3>
                                <p><span>Autor:</span> {book.autor}</p>
                                <p><span>Año de publicación:</span> {book.publicacion}</p>
                                <p><span>ISBN:</span> {book.isbn}</p>
                                <p><span>Estado:</span> {book.cantidadDisponible > 0 ? "Disponible" : "No disponible"}</p> 
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Library;

