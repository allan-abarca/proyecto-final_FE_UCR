const mongoose = require('mongoose');

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/librosdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Conectado a MongoDB...'))
  .catch(err => console.error('No se pudo conectar a MongoDB', err));

// Definir el esquema y modelo de Libro
const libroSchema = new mongoose.Schema({
  nombre: String,
  autor: String,
  isbn: String,
  imagen: String,
  publicacion: String,
  cantidadDisponible: Number,
  genero: String
});

const Libro = mongoose.model('Libro', libroSchema);

// Lista de libros
const libros = [
  { nombre: "Cien Años de Soledad", autor: "Gabriel García Márquez", isbn: "978-84-376-0494-7", imagen: "https://example.com/imagen1.jpg", publicacion: "1967", cantidadDisponible: 5, genero: "Realismo Mágico" },
  { nombre: "Don Quijote de la Mancha", autor: "Miguel de Cervantes", isbn: "978-84-376-0493-0", imagen: "https://example.com/imagen2.jpg", publicacion: "1605", cantidadDisponible: 3, genero: "Clásico" },
  { nombre: "La Odisea", autor: "Homero", isbn: "978-84-376-0492-0", imagen: "https://example.com/imagen3.jpg", publicacion: "800 a.C.", cantidadDisponible: 10, genero: "Épica" },
  { nombre: "Crimen y Castigo", autor: "Fiódor Dostoyevski", isbn: "978-84-376-0495-8", imagen: "https://example.com/imagen4.jpg", publicacion: "1866", cantidadDisponible: 4, genero: "Filosofía" },
  { nombre: "El Gran Gatsby", autor: "F. Scott Fitzgerald", isbn: "978-84-376-0496-9", imagen: "https://example.com/imagen5.jpg", publicacion: "1925", cantidadDisponible: 6, genero: "Ficción" },
  { nombre: "Matar a un Ruiseñor", autor: "Harper Lee", isbn: "978-84-376-0497-0", imagen: "https://example.com/imagen6.jpg", publicacion: "1960", cantidadDisponible: 5, genero: "Ficción" },
  { nombre: "1984", autor: "George Orwell", isbn: "978-84-376-0498-1", imagen: "https://example.com/imagen7.jpg", publicacion: "1949", cantidadDisponible: 7, genero: "Distopía" },
  { nombre: "Brave New World", autor: "Aldous Huxley", isbn: "978-84-376-0499-2", imagen: "https://example.com/imagen8.jpg", publicacion: "1932", cantidadDisponible: 4, genero: "Distopía" },
  { nombre: "Orgullo y Prejuicio", autor: "Jane Austen", isbn: "978-84-376-0500-1", imagen: "https://example.com/imagen9.jpg", publicacion: "1813", cantidadDisponible: 2, genero: "Romance" },
  { nombre: "El Principito", autor: "Antoine de Saint-Exupéry", isbn: "978-84-376-0501-2", imagen: "https://example.com/imagen10.jpg", publicacion: "1943", cantidadDisponible: 8, genero: "Fábula" },
  { nombre: "Drácula", autor: "Bram Stoker", isbn: "978-84-376-0502-3", imagen: "https://example.com/imagen11.jpg", publicacion: "1897", cantidadDisponible: 3, genero: "Terror" },
  { nombre: "Frankenstein", autor: "Mary Shelley", isbn: "978-84-376-0503-4", imagen: "https://example.com/imagen12.jpg", publicacion: "1818", cantidadDisponible: 6, genero: "Terror" },
  { nombre: "Fahrenheit 451", autor: "Ray Bradbury", isbn: "978-84-376-0504-5", imagen: "https://example.com/imagen13.jpg", publicacion: "1953", cantidadDisponible: 7, genero: "Distopía" },
  { nombre: "El Señor de los Anillos", autor: "J. R. R. Tolkien", isbn: "978-84-376-0505-6", imagen: "https://example.com/imagen14.jpg", publicacion: "1954", cantidadDisponible: 4, genero: "Fantasía" },
  { nombre: "Harry Potter y la piedra filosofal", autor: "J. K. Rowling", isbn: "978-84-376-0506-7", imagen: "https://example.com/imagen15.jpg", publicacion: "1997", cantidadDisponible: 10, genero: "Fantasía" },
  { nombre: "El Código Da Vinci", autor: "Dan Brown", isbn: "978-84-376-0507-8", imagen: "https://example.com/imagen16.jpg", publicacion: "2003", cantidadDisponible: 8, genero: "Suspenso" },
  { nombre: "El Alquimista", autor: "Paulo Coelho", isbn: "978-84-376-0508-9", imagen: "https://example.com/imagen17.jpg", publicacion: "1988", cantidadDisponible: 6, genero: "Filosofía" },
  { nombre: "Los Juegos del Hambre", autor: "Suzanne Collins", isbn: "978-84-376-0509-0", imagen: "https://example.com/imagen18.jpg", publicacion: "2008", cantidadDisponible: 7, genero: "Distopía" },
  { nombre: "La Sombra del Viento", autor: "Carlos Ruiz Zafón", isbn: "978-84-376-0510-1", imagen: "https://example.com/imagen19.jpg", publicacion: "2001", cantidadDisponible: 3, genero: "Ficción" },
  { nombre: "Cumbres Borrascosas", autor: "Emily Brontë", isbn: "978-84-376-0511-2", imagen: "https://example.com/imagen20.jpg", publicacion: "1847", cantidadDisponible: 5, genero: "Romance" }
];

// Insertar libros en MongoDB
async function seedLibros() {
  await Libro.deleteMany(); // Limpiar colección antes de insertar
  await Libro.insertMany(libros);
  console.log("Libros insertados");
  mongoose.connection.close();
}

seedLibros();