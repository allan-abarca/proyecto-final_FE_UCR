import React from 'react';

const Books = ({ books, takeLibro, returnLibro }) => {
  return (
    <div>
      {books.map(book => (
        <div key={book._id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc' }}>
          <h3>{book.nombre}</h3>
          <img src={book.imagen} alt={book.nombre} style={{ width: '150px', height: '200px' }} />
          <p>Autor: {book.autor}</p>
          <p>Género: {book.genero}</p>
          <p>Cantidad Disponible: {book.cantidadDisponible}</p>

          {book.cantidadDisponible > 0 ? (
            <button onClick={() => takeLibro(book._id)}>Tomar Libro</button>
          ) : (
            <p style={{ color: 'red' }}>No disponible</p>
          )}
          <button onClick={() => returnLibro(book._id)}>Devolver Libro</button>
        </div>
      ))}
    </div>
  );
};

export default Books;
