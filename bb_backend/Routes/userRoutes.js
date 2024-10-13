const express = require('express');
const router = express.Router();
const User = require('../models/User');  // Modelo de usuario

// Ruta para registrar usuarios (solo accesible para administradores)
router.post('/register', async (req, res) => {
  const { nombre, email, password, role } = req.body;

  // Verificar si el usuario ya existe
  const existUser = await User.findOne({ email });
  if (existUser) return res.status(400).send('El usuario ya existe');

  // Crear un nuevo usuario
  const newUser = new User({ nombre, email, password, role });
  await newUser.save(); // Guardar en la base de datos

  res.status(201).json(newUser); // Responder con el nuevo usuario
});

// Ruta de inicio de sesión
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }); // Buscar al usuario por correo

  // Verificar si el usuario existe y si la contraseña es correcta
  if (!user || user.password !== password) {
    return res.status(400).send('Credenciales incorrectas');
  }

  res.status(200).json({ role: user.role }); // Responder con el rol del usuario
});

// Ruta para listar todos los usuarios (solo accesible para administradores)
router.get('/', async (req, res) => {
  try {
    const users = await User.find(); // Obtener todos los usuarios
    res.status(200).json(users); // Responder con la lista de usuarios
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios', error });
  }
});

// Ruta para editar un usuario por ID (solo accesible para administradores)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, email, password, role } = req.body;

  try {
    // Buscar el usuario por ID y actualizar con los datos proporcionados
    const updatedUser = await User.findByIdAndUpdate(id, { nombre, email, password, role }, { new: true });
    if (!updatedUser) return res.status(404).send('Usuario no encontrado');
    
    res.status(200).json(updatedUser); // Responder con el usuario actualizado
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario', error });
  }
});

// Ruta para eliminar un usuario por ID (solo accesible para administradores)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id); // Eliminar usuario por ID
    if (!deletedUser) return res.status(404).send('Usuario no encontrado');

    res.status(200).send('Usuario eliminado'); // Responder con éxito
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario', error });
  }
});

module.exports = router;
