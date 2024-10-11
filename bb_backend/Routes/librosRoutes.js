const express = require('express');
const router = express.Router();
const Libro = require('../models/Libro'); 

// Ruta para obtener todos los libros
router.get('/', async (req, res) => {
  const { nombre, autor, genero } = req.query;

  try {
    // Crear un objeto de filtro dinámico
    const filtro = {};
    
    if (nombre) {
      filtro.nombre = { $regex: nombre, $options: 'i' };  // nombre (case-insensitive)
    }
    if (autor) {
      filtro.autor = { $regex: autor, $options: 'i' };  // autor (case-insensitive)
    }
    if (genero) {
      filtro.genero = { $regex: genero, $options: 'i' };  //género (case-insensitive)
    }

    // Obtener libros con el filtro aplicado
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

// Ruta para tomar un libro (disminuir cantidad disponible)
router.post('/take/:id', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;  // El ID del usuario que toma el libro

  try {
    const libro = await Libro.findById(id);
    const user = await User.findById(userId);

    if (!libro || !user) {
      return res.status(404).json({ message: 'Usuario o libro no encontrado' });
    }

    // Verificar si hay libros disponibles
    if (libro.cantidadDisponible > 0) {
      // Verificar si el usuario ya ha tomado este libro
      const libroTomado = user.librosTomados.find(item => item.libroId.toString() === libro._id.toString());

      if (libroTomado) {
        return res.status(400).json({ message: 'Ya has tomado este libro' });
      }

      // Reducir la cantidad disponible
      libro.cantidadDisponible -= 1;

      // Asignar el libro al usuario
      user.librosTomados.push({ libroId: libro._id });

      await libro.save();
      await user.save();

      res.status(200).json({ libro, user });
    } else {
      res.status(400).json({ message: 'No hay más copias disponibles' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al tomar el libro', error });
  }
});

// Ruta para devolver un libro (aumentar cantidad disponible y eliminar de la lista del usuario)
router.post('/return/:id', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;  // El ID del usuario que devuelve el libro

  try {
    const libro = await Libro.findById(id);
    const user = await User.findById(userId);

    if (!libro || !user) {
      return res.status(404).json({ message: 'Usuario o libro no encontrado' });
    }

    // Verificar si el usuario tiene este libro en su lista de libros tomados
    const libroIndex = user.librosTomados.findIndex(item => item.libroId.toString() === libro._id.toString());

    if (libroIndex === -1) {
      return res.status(400).json({ message: 'No tienes este libro en alquiler' });
    }

    // Aumentar la cantidad disponible del libro
    libro.cantidadDisponible += 1;

    // Eliminar el libro de la lista de libros tomados del usuario
    user.librosTomados.splice(libroIndex, 1);

    await libro.save();
    await user.save();

    res.status(200).json({ libro, user });
  } catch (error) {
    res.status(500).json({ message: 'Error al devolver el libro', error });
  }
});



module.exports = router;
