// routes/libros.js
const express = require('express');
const router = express.Router();
const Libro = require('../models/libro'); // Importar el modelo

// Ruta para obtener todos los libros
router.get('/', async (req, res) => {
  const libros = await Libro.find();
  res.json(libros);
});

// Ruta para obtener un libro por ID
router.get('/:id', async (req, res) => {
  const libro = await Libro.findById(req.params.id);
  if (!libro) return res.status(404).send('El libro no fue encontrado');
  res.json(libro);
});

// Ruta para agregar un nuevo libro
router.post('/', async (req, res) => {
  const nuevoLibro = new Libro({
    nombre: req.body.nombre,
    autor: req.body.autor,
    isbn: req.body.isbn,
    imagen: req.body.imagen,
    publicacion: req.body.publicacion,
    cantidadDisponible: req.body.cantidadDisponible,
    genero: req.body.genero,
  });

  await nuevoLibro.save();
  res.status(201).json(nuevoLibro);
});

// Ruta para actualizar un libro existente
router.put('/:id', async (req, res) => {
  const libro = await Libro.findByIdAndUpdate(
    req.params.id,
    {
      nombre: req.body.nombre,
      autor: req.body.autor,
      isbn: req.body.isbn,
      imagen: req.body.imagen,
      publicacion: req.body.publicacion,
      cantidadDisponible: req.body.cantidadDisponible,
      genero: req.body.genero,
    },
    { new: true }
  );

  if (!libro) return res.status(404).send('El libro no fue encontrado');
  res.json(libro);
});

// Ruta para eliminar un libro
router.delete('/:id', async (req, res) => {
  const libro = await Libro.findByIdAndRemove(req.params.id);
  if (!libro) return res.status(404).send('El libro no fue encontrado');

  res.json({ mensaje: 'Libro eliminado', libro });
});

module.exports = router;  // Exportar el router para su uso en `server.js`
