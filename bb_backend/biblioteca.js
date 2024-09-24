const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Permitir que el servidor pueda manejar JSON
app.use(express.json());

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

// Ruta para obtener todos los libros
app.get('/api/libros', async (req, res) => {
  const libros = await Libro.find();
  res.json(libros);
});

// Ruta para obtener un libro por ID
app.get('/api/libros/:id', async (req, res) => {
  const libro = await Libro.findById(req.params.id);
  if (!libro) return res.status(404).send('El libro no fue encontrado');
  res.json(libro);
});

// Ruta para agregar un nuevo libro
app.post('/api/libros', async (req, res) => {
  const nuevoLibro = new Libro({
    nombre: req.body.nombre,
    autor: req.body.autor,
    isbn: req.body.isbn,
    imagen: req.body.imagen,
    publicacion: req.body.publicacion,
    cantidadDisponible: req.body.cantidadDisponible,
    genero: req.body.genero
  });

  await nuevoLibro.save();
  res.status(201).json(nuevoLibro);
});

// Ruta para actualizar un libro existente
app.put('/api/libros/:id', async (req, res) => {
  const libro = await Libro.findByIdAndUpdate(
    req.params.id,
    {
      nombre: req.body.nombre,
      autor: req.body.autor,
      isbn: req.body.isbn,
      imagen: req.body.imagen,
      publicacion: req.body.publicacion,
      cantidadDisponible: req.body.cantidadDisponible,
      genero: req.body.genero
    },
    { new: true }
  );

  if (!libro) return res.status(404).send('El libro no fue encontrado');
  res.json(libro);
});

// Ruta para eliminar un libro
app.delete('/api/libros/:id', async (req, res) => {
  const libro = await Libro.findByIdAndRemove(req.params.id);
  if (!libro) return res.status(404).send('El libro no fue encontrado');

  res.json({ mensaje: 'Libro eliminado', libro });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`API de libros ejecutándose en http://localhost:${port}`);
});