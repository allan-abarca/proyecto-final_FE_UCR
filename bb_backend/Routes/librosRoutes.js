const express = require('express');
const router = express.Router();
const Libro = require('../models/Libro'); 
const User = require('../models/User');
const mongoose = require('mongoose');

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
// Ruta para tomar un libro por su ID

router.post('/take/:id', async (req, res) => {
  const { id } = req.params;  // ID del libro
  const { userId } = req.body;  // ID del usuario que toma el libro

  try {
    // Verificar si el userId es válido
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.log('userId no es un ObjectId válido:', userId);
      return res.status(400).json({ message: 'ID de usuario inválido' });
    }

    // Crear el ObjectId correctamente usando 'new'
    const userObjectId = new mongoose.Types.ObjectId(userId);  // Asegúrate de usar 'new'

    // Buscar el libro y el usuario
    const libro = await Libro.findById(id);
    const user = await User.findById(userObjectId);

    if (!libro) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar si el usuario ya ha tomado el libro
    const libroTomado = user.librosTomados.find(item => item.libroId.toString() === libro._id.toString());
    if (libroTomado) {
      return res.status(400).json({ message: 'Ya has tomado este libro' });
    }

    // Verificar si hay copias disponibles
    if (libro.cantidadDisponible > 0) {
      libro.cantidadDisponible -= 1;

      user.librosTomados.push({ libroId: libro._id });

      await libro.save();
      await user.save();

      res.status(200).json(libro);  // Devolver el libro actualizado
    } else {
      res.status(400).json({ message: 'No hay más copias disponibles' });
    }
  } catch (error) {
    console.error('Error al tomar el libro:', error);
    res.status(500).json({ message: 'Error al tomar el libro', error });
  }
});



// router.post('/take/:id', async (req, res) => {
//   const { id } = req.params;
//   const { userId } = req.body;  // El ID del usuario que toma el libro

//   try {
//     const libro = await Libro.findById(id);
//     const user = await User.findById(userId);

//     if (!libro || !user) {
//       return res.status(404).json({ message: 'Usuario o libro no encontrado' });
//     }

//     // Verificar si hay libros disponibles
//     if (libro.cantidadDisponible > 0) {
//       const libroTomado = user.librosTomados.find(item => item.libroId.toString() === libro._id.toString());

//       if (libroTomado) {
//         return res.status(400).json({ message: 'Ya has tomado este libro' });
//       }

//       // Reducir la cantidad disponible
//       libro.cantidadDisponible -= 1;
//       user.librosTomados.push({ libroId: libro._id });

//       await libro.save();
//       await user.save();

//       res.status(200).json(libro);  // Devolver solo el libro actualizado
//     } else {
//       res.status(400).json({ message: 'No hay más copias disponibles' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error al tomar el libro', error });
//   }
// });

// Ruta para devolver un libro (aumentar cantidad disponible y eliminar de la lista del usuario)
// router.post('/return/:id', async (req, res) => {
//   const { id } = req.params;
//   const { userId } = req.body;

//   try {
//     const libro = await Libro.findById(id);
//     const user = await User.findById(userId);

//     if (!libro || !user) {
//       return res.status(404).json({ message: 'Usuario o libro no encontrado' });
//     }

//     const libroIndex = user.librosTomados.findIndex(item => item.libroId.toString() === libro._id.toString());

//     if (libroIndex === -1) {
//       return res.status(400).json({ message: 'No tienes este libro en alquiler' });
//     }

//     libro.cantidadDisponible += 1;
//     user.librosTomados.splice(libroIndex, 1);

//     await libro.save();
//     await user.save();

//     res.status(200).json(libro);  // Devolver solo el libro actualizado
//   } catch (error) {
//     res.status(500).json({ message: 'Error al devolver el libro', error });
//   }
// });
router.post('/return/:id', async (req, res) => {
  const { id } = req.params; // ID del libro que se devuelve
  const { userId } = req.body; // ID del usuario que devuelve el libro

  try {
    // Verifica si los parámetros están presentes
    if (!id || !userId) {
      console.log('Faltan parámetros: id o userId');
      return res.status(400).json({ message: 'Faltan parámetros id o userId' });
    }

    console.log('Buscando libro con ID:', id);
    const libro = await Libro.findById(id);

    console.log('Buscando usuario con ID:', userId);
    const user = await User.findById(userId);

    // Verificar si el libro o el usuario existen
    if (!libro) {
      console.log('Libro no encontrado con ID:', id);
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    if (!user) {
      console.log('Usuario no encontrado con ID:', userId);
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar si el libro está en la lista de libros tomados del usuario
    const libroIndex = user.librosTomados.findIndex(item => item.libroId.toString() === libro._id.toString());
    console.log('Índice del libro en librosTomados:', libroIndex);

    if (libroIndex === -1) {
      console.log('El libro no está en la lista de libros tomados por el usuario');
      return res.status(400).json({ message: 'No tienes este libro en alquiler' });
    }

    // Aumentar la cantidad disponible del libro
    libro.cantidadDisponible += 1;
    console.log('Cantidad disponible de libro actualizada:', libro.cantidadDisponible);

    // Eliminar el libro de la lista de libros tomados del usuario
    user.librosTomados.splice(libroIndex, 1);
    console.log('Libro eliminado de la lista de libros tomados del usuario');

    // Guardar los cambios en la base de datos
    await libro.save();
    await user.save();

    console.log('Libro devuelto exitosamente');
    res.status(200).json(libro);  // Devolver el libro actualizado
  } catch (error) {
    console.error('Error al devolver el libro:', error);
    res.status(500).json({ message: 'Error al devolver el libro', error });
  }
});

module.exports = router;
