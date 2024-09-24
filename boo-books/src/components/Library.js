import React, { useState, useEffect } from "react";
import axios from "axios";

// Este componente se llama "Library" y muestra una lista de libros y sus detalles.
const Library = () => {
    // `books` es donde guardamos la lista de libros que obtenemos de la API.
    // `searchTerm` es lo que el usuario escribe para buscar un libro.
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); 

    // Este efecto se ejecuta al cargar la página.
    // Llamamos a la API para obtener los libros y luego los guardamos en `books`.
    useEffect(() => {
        axios.get("api/libros") 
            .then(response => setBooks(response.data)) 
            .catch(error => console.error); 
    }, []); 

    return (
        <div>
            {/* Caja de texto donde el usuario puede escribir para buscar libros */}
            <input
                type="text"
                placeholder="Buscar libro..." 
                value={searcTerm}
                onChange={e => setSearchTerm(e.target.value)} 
            />

            {/* Aquí mostramos los libros en dos columnas: imágenes y detalles */}
            <div style={{ display: "flex", flexDirection: "row" }}>
                
                {/* Primera columna: las imágenes de los libros */}
                <div style={{ flex: 1 }}>
                    {/* Filtramos los libros para mostrar solo los que coinciden con la búsqueda */}
                    {books
                        .filter(book => book.nombre.toLowerCase().includes(searcTerm.toLowerCase())) 
                        .map((book) => (
                           
                            <div key={book._id}>
                                <img src={book.imagen} alt={book.nombre} style={{ width: "100px" }} />
                            </div>
                        ))
                    }
                </div>

                {/* Segunda columna: los detalles de los libros */}
                <div style={{ flex: 1 }}>
                    {/* Repetimos el filtrado para mostrar los detalles solo de los libros filtrados */}
                    {books
                        .filter(book => book.nombre.toLowerCase().includes(searcTerm.toLowerCase())) 
                        .map((book) => (
                            // Mostramos los detalles de cada libro.
                            <div key={book._id}>
                                <h3>{book.nombre}</h3>
                                <p>Autor: {book.autor}</p>
                                <p>Año de publicación: {book.publicacion}</p>
                                <p>ISBN: {book.isbn}</p>
                                {/* Si la cantidad de libros disponibles es mayor a 0, decimos que está disponible. */}
                                <p>Estado: {book.cantidadDisponible > 0 ? "Disponible" : "No disponible"}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Library;
