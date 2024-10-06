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

//Ruta para editar libro 

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

// hacer ruta para tomar los libros 
router.post('/take/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const libro = await Libro.findById(id);

    // Verificar disponibles
    if (libro.cantidadDisponible > 0) {
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

//agreagr ruta para definir como se toman los libros

router.post('/take/:id', async (req, res) => {
  const { id } = req.params;

  try {
    
    const libro = await Libro.findById(id);

   
    if (libro.cantidadDisponible > 0) {
      
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
router.post('/return/:id', async (req, res) => {
  const { id } = req.params;

  try {
    
    const libro = await Libro.findById(id);

   
    if (libro.cantidadDisponible >= 0) {
      
      libro.cantidadDisponible +=1;
      await libro.save();  
      res.status(200).json(libro);
    } else {
      res.status(400).json({ message: 'Error al devolver el libro' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al devolver el libro', error });
  }
});

module.exports = router;
