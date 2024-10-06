import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminLibros = () => {
  const [libros, setLibros] = useState([]);
  const [editingLibro, setEditingLibro] = useState(null); // Controla el libro que se está editando
  const [showCreateForm, setShowCreateForm] = useState(false); // Controla si se muestra el formulario de creación
  const [formValues, setFormValues] = useState({
    nombre: "",
    autor: "",
    isbn: "",
    imagen: "",
    publicacion: "",
    cantidadDisponible: "",
    genero: "",
  });

  // Obtener todos los libros al cargar el componente
  useEffect(() => {
    axios
      .get("/api/libros")
      .then((response) => setLibros(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Eliminar un libro (solo admin)
  const deleteLibro = (id) => {
    axios
      .delete(`/api/libros/${id}`)
      .then(() => setLibros(libros.filter((libro) => libro._id !== id)))
      .catch((error) => console.error(error));
  };

  // Manejar el inicio de la edición (solo admin)
  const startEdit = (libro) => {
    setEditingLibro(libro._id);
    setFormValues({
      nombre: libro.nombre,
      autor: libro.autor,
      isbn: libro.isbn,
      imagen: libro.imagen,
      publicacion: libro.publicacion,
      cantidadDisponible: libro.cantidadDisponible,
      genero: libro.genero,
    });
    setShowCreateForm(false); // Asegurarnos de que no se muestre el formulario de creación
  };

  // Manejar los cambios en el formulario (solo admin)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Actualizar un libro
  const updateLibro = (id) => {
    axios
      .put(`/api/libros/${id}`, formValues)
      .then((response) => {
        setLibros(
          libros.map((libro) => (libro._id === id ? response.data : libro))
        );
        setEditingLibro(null); // aqui se sale de editar
        setFormValues({
          nombre: "",
          autor: "",
          isbn: "",
          imagen: "",
          publicacion: "",
          cantidadDisponible: "",
          genero: "",
        }); // Resetear los valores del formulario
      })
      .catch((error) => console.error(error));
  };

  // Crear un nuevo libro
  const createLibro = () => {
    axios
      .post("/api/libros", formValues)
      .then((response) => {
        setLibros([...libros, response.data]);
        setShowCreateForm(false); // Ocultar el formulario después de crear el libro
        setFormValues({
          nombre: "",
          autor: "",
          isbn: "",
          imagen: "",
          publicacion: "",
          cantidadDisponible: "",
          genero: "",
        }); // Resetear los valores del formulario
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Gestión de Libros</h1>

      {/* Botón para mostrar el formulario de creación */}
      <button onClick={() => setShowCreateForm(!showCreateForm)}>
        {showCreateForm ? "Cancelar" : "Crear Nuevo Libro"}
      </button>

      {/* Formulario de creación de libro */}
      {showCreateForm && (
        <div>
          <h2>Crear Nuevo Libro</h2>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formValues.nombre}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="autor"
            placeholder="Autor"
            value={formValues.autor}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="isbn"
            placeholder="ISBN"
            value={formValues.isbn}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="imagen"
            placeholder="URL de la Imagen"
            value={formValues.imagen}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="publicacion"
            placeholder="Fecha de Publicación"
            value={formValues.publicacion}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="cantidadDisponible"
            placeholder="Cantidad Disponible"
            value={formValues.cantidadDisponible}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="genero"
            placeholder="Género"
            value={formValues.genero}
            onChange={handleInputChange}
          />
          <button onClick={createLibro}>Guardar</button>
        </div>
      )}

      <ul>
        {libros.map((libro) => (
          <li key={libro._id}>
            {editingLibro === libro._id ? (
              <div>
                <input
                  type="text"
                  name="nombre"
                  value={formValues.nombre}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="autor"
                  value={formValues.autor}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="isbn"
                  value={formValues.isbn}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="imagen"
                  value={formValues.imagen}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="publicacion"
                  value={formValues.publicacion}
                  onChange={handleInputChange}
                />
                <input
                  type="number"
                  name="cantidadDisponible"
                  value={formValues.cantidadDisponible}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="genero"
                  value={formValues.genero}
                  onChange={handleInputChange}
                />
                <button onClick={() => updateLibro(libro._id)}>
                  Guardar Cambios
                </button>
                <button onClick={() => setEditingLibro(null)}>Cancelar</button>
              </div>
            ) : (
              <div className="bookList">
                {libro.nombre} - {libro.autor} ({libro.genero})
                <div className="buttons">
                  <button onClick={() => deleteLibro(libro._id)}>
                    Eliminar
                  </button>
                  <button onClick={() => startEdit(libro)}>Editar</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminLibros;
