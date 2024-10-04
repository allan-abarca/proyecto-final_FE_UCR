const express = require('express');
const router = express.Router();
const Libro = require('../models/Libro');  
// Ruta para obtener todos los libros
router.get('/', async (req, res) => {
  try {
    const libros = await Libro.find();
    res.status(200).json(libros);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los libros', error });
  }
});

// Ruta para crear un nuevo libro
router.post('/', async (req, res) => {
  const { nombre, autor, isbn, imagen, publicacion, cantidadDisponible, genero } = req.body;

  try {
    const nuevoLibro = new Libro({
      nombre,
      autor,
      isbn,
      imagen,
      publicacion,
      cantidadDisponible,
      genero,
    });

    await nuevoLibro.save();
    res.status(201).json(nuevoLibro);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el libro', error });
  }
});

// Ruta para eliminar un libro por su ID
router.delete('/:id', async (req, res) => {
  try {
    const libro = await Libro.findByIdAndDelete(req.params.id);
    if (!libro) return res.status(404).json({ message: 'Libro no encontrado' });
    res.status(200).json({ message: 'Libro eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el libro', error });
  }
});

module.exports = router;
