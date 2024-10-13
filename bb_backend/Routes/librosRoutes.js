const express = require('express');
const router = express.Router();
const Libro = require('../models/Libro'); 
const User = require('../models/User');
const mongoose = require('mongoose');

// Ruta para obtener todos los libros, con filtros opcionales
router.get('/', async (req, res) => {
  const { nombre, autor, genero } = req.query;

  try {
    // Crear un filtro dinámico basado en los parámetros
    const filtro = {};
    
    if (nombre) {
      filtro.nombre = { $regex: nombre, $options: 'i' };  // Buscar por nombre (sin distinción de mayúsculas/minúsculas)
    }
    if (autor) {
      filtro.autor = { $regex: autor, $options: 'i' };  // Buscar por autor
    }
    if (genero) {
      filtro.genero = { $regex: genero, $options: 'i' };  // Buscar por género
    }

    const libros = await Libro.find(filtro); // Buscar los libros con el filtro aplicado
    res.status(200).json(libros); // Responder con los libros encontrados
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los libros', error });
  }
});

// Ruta para crear un nuevo libro
router.post('/', async (req, res) => {
  const { nombre, autor, isbn, imagen, publicacion, cantidadDisponible, genero } = req.body;

  try {
    // Crear un nuevo libro con los datos proporcionados
    const nuevoLibro = new Libro({
      nombre,
      autor,
      isbn,
      imagen,
      publicacion,
      cantidadDisponible,
      genero,
    });

    await nuevoLibro.save(); // Guardar el libro en la base de datos
    res.status(201).json(nuevoLibro); // Responder con el libro creado
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el libro', error });
  }
});

// Ruta para eliminar un libro por ID
router.delete('/:id', async (req, res) => {
  try {
    const libro = await Libro.findByIdAndDelete(req.params.id); // Buscar y eliminar el libro por ID
    if (!libro) return res.status(404).json({ message: 'Libro no encontrado' });
    res.status(200).json({ message: 'Libro eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el libro', error });
  }
});

// Ruta para actualizar un libro por ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, autor, isbn, imagen, publicacion, cantidadDisponible, genero } = req.body;

  try {
    // Buscar y actualizar el libro con los nuevos datos
    const updatedLibro = await Libro.findByIdAndUpdate(id, {
      nombre, autor, isbn, imagen, publicacion, cantidadDisponible, genero
    }, { new: true });

    if (!updatedLibro) return res.status(404).send('Libro no encontrado');
    res.status(200).json(updatedLibro); // Responder con el libro actualizado
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el libro', error });
  }
});

// Ruta para tomar un libro (reducir cantidad disponible y asignarlo a un usuario)
router.post('/take/:id', async (req, res) => {
  const { id } = req.params;  // ID del libro
  const { userId } = req.body;  // ID del usuario que toma el libro

  try {
    // Validar que el ID del usuario sea correcto
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'ID de usuario inválido' });
    }

    // Buscar el libro y el usuario
    const libro = await Libro.findById(id);
    const user = await User.findById(userId);

    if (!libro) return res.status(404).json({ message: 'Libro no encontrado' });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    // Verificar si el usuario ya ha tomado el libro
    const libroTomado = user.librosTomados.find(item => item.libroId.toString() === libro._id.toString());
    if (libroTomado) return res.status(400).json({ message: 'Ya has tomado este libro' });

    // Verificar si hay copias disponibles
    if (libro.cantidadDisponible > 0) {
      libro.cantidadDisponible -= 1; // Reducir cantidad disponible
      user.librosTomados.push({ libroId: libro._id }); // Añadir el libro a la lista de libros tomados

      await libro.save(); // Guardar cambios en la base de datos
      await user.save();

      res.status(200).json(libro);  // Responder con el libro actualizado
    } else {
      res.status(400).json({ message: 'No hay más copias disponibles' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al tomar el libro', error });
  }
});

// Ruta para devolver un libro (aumentar cantidad disponible y eliminarlo de la lista del usuario)
router.post('/return/:id', async (req, res) => {
  const { id } = req.params; // ID del libro
  const { userId } = req.body; // ID del usuario

  try {
    const libro = await Libro.findById(id);
    const user = await User.findById(userId);

    if (!libro) return res.status(404).json({ message: 'Libro no encontrado' });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    // Verificar si el libro está en la lista de libros tomados por el usuario
    const libroIndex = user.librosTomados.findIndex(item => item.libroId.toString() === libro._id.toString());
    if (libroIndex === -1) return res.status(400).json({ message: 'No tienes este libro en alquiler' });

    // Aumentar la cantidad disponible
    libro.cantidadDisponible += 1;
    user.librosTomados.splice(libroIndex, 1); // Eliminar el libro de la lista de libros tomados

    await libro.save(); // Guardar los cambios
    await user.save();

    res.status(200).json(libro);  // Responder con el libro actualizado
  } catch (error) {
    res.status(500).json({ message: 'Error al devolver el libro', error });
  }
});

module.exports = router;
