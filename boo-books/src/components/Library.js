import React, {useState, useEffect} from "react";
import axios from "axios";

const Library = ()=>{
    const [books, setBooks] = useState([]);
    const [searcTerm, setSearchTerm] = useState("");

    useEffect(()=>{
        axios.get("api/libros")
        .then(response => setBooks(response.data))
        .catch(error => console.error);
    }, []);

    return(
        <div>
            <input
                type="text"
                placeholder="Buscar libro..."
                value={searcTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <div style={{display: "flex", flexDirection: "row"}}>
                <div style={{flex: 1}}>
                    {books.filter(book => book.nombre.toLowerCase().includes(searcTerm.toLowerCase())).map((book) => (
                        <div key={book._id}>
                            <img src={book.imagen} alt={book.nombre} style={{width: "100px"}}/>
                        </div>
                    ))}
                </div>
                <div style={{flex: 1}}>
                    {books.filter(book => book.nombre.toLowerCase().includes(searcTerm.toLowerCase())).map((book) =>(
                        <div key={book._id}>
                            <h3>{book.nombre}</h3>
                            <p>Autor: {book.autor}</p>
                            <p>Año de publicación: {book.publicacion}</p>
                            <p>ISBN: {book.isbn}</p>
                            <p>Estado: {book.cantidadDisponible > 0 ? "Disponible" : "No disponible"}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Library;