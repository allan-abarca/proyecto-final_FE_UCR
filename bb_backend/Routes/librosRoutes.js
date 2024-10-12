// Routes/librosRoutes.js
const express = require('express');
const router = express.Router();
const Libro = require('../models/Libro'); 
const User = require('../models/User');

// Ruta para obtener todos los libros o filtrarlos por nombre, autor, género
router.get('/', async (req, res) => {
  const { nombre, autor, genero } = req.query;

  try {
    const filtro = {};
    
    // Agrega los filtros de forma dinámica solo si se proporcionan
    if (nombre) {
      filtro.nombre = { $regex: nombre, $options: 'i' };
    }
    if (autor) {
      filtro.autor = { $regex: autor, $options: 'i' };
    }
    if (genero) {
      filtro.genero = { $regex: genero, $options: 'i' };
    }

    const libros = await Libro.find(filtro);
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

// Ruta para actualizar un libro por ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, autor, isbn, imagen, publicacion, cantidadDisponible, genero } = req.body;

  try {
    const updatedLibro = await Libro.findByIdAndUpdate(id, {
      nombre, autor, isbn, imagen, publicacion, cantidadDisponible, genero
    }, { new: true });

    if (!updatedLibro) return res.status(404).send('Libro no encontrado');
    res.status(200).json(updatedLibro);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el libro', error });
  }
});



// Ruta para tomar un libro (disminuir cantidad)

router.post('/take/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const libro = await Libro.findById(id);

    if (libro.cantidadDisponible > 0) {

      const libroTomado = user.librosTomados.find(item => item.libroId.toString() === libro._id.toString());

      if (libroTomado) {
        return res.status(400).json({ message: 'Ya has tomado este libro' });
      }

      // Reducir la cantidad disponible
      libro.cantidadDisponible -= 1;
      user.librosTomados.push({ libroId: libro._id });

      await libro.save();
      await user.save();

      res.status(200).json(libro);  // Devolver solo el libro actualizado

      libro.cantidadDisponible -= 1;
      await libro.save();
      res.status(200).json(libro);

    } else {
      res.status(400).json({ message: 'No hay más copias disponibles' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al tomar el libro', error });
  }
});

// Ruta para devolver un libro (aumentar cantidad)
router.post('/return/:id', async (req, res) => {
  const { id } = req.params;

  const { userId } = req.body;

  try {
    const libro = await Libro.findById(id);
    const user = await User.findById(userId);

    if (!libro || !user) {
      return res.status(404).json({ message: 'Usuario o libro no encontrado' });
    }

    const libroIndex = user.librosTomados.findIndex(item => item.libroId.toString() === libro._id.toString());

    if (libroIndex === -1) {
      return res.status(400).json({ message: 'No tienes este libro en alquiler' });
    }

    libro.cantidadDisponible += 1;
    user.librosTomados.splice(libroIndex, 1);

    await libro.save();
    await user.save();

    res.status(200).json(libro);  // Devolver solo el libro actualizado


  try {
    const libro = await Libro.findById(id);

    libro.cantidadDisponible += 1;
    await libro.save();
    res.status(200).json(libro);

  } catch (error) {
    res.status(500).json({ message: 'Error al devolver el libro', error });
  }
});
module.exports = router;
