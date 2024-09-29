import React from "react";

const Books = ({ books, searchTerm }) => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ flex: 1 }}>
        {books
          .filter((book) =>
            book.nombre.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((book) => (
            <div key={book._id}>
              <img src={book.imagen} alt={book.nombre} style={{ width: "100px" }} />
            </div>
          ))}
      </div>
      <div style={{ flex: 1 }}>
        {books
          .filter((book) =>
            book.nombre.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((book) => (
            <div key={book._id}>
              <h3>{book.nombre}</h3>
              <p>Autor: {book.autor}</p>
              <p>Año de publicación: {book.publicacion}</p>
              <p>ISBN: {book.isbn}</p>
              <p>
                Estado: {book.cantidadDisponible > 0 ? "Disponible" : "No disponible"}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Books;
