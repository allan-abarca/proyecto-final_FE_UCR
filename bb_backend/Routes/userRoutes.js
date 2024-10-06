const express = require('express');
const router = express.Router();
const User = require('../models/User');  // Asegúrate de que el modelo User esté en una carpeta llamada models

// Ruta para registrar usuarios (solo admin)
router.post('/register', async (req, res) => {
  const { nombre, email, password, role } = req.body;

  const existUser = await User.findOne({ email });
  if (existUser) return res.status(400).send('El usuario ya existe');

  const newUser = new User({ nombre, email, password, role });
  await newUser.save();

  res.status(201).json(newUser);
});

// Ruta de inicio de sesión
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.password !== password) {
    return res.status(400).send('Credenciales incorrectas');
  }

  res.status(200).json({ role: user.role });
});

// Listar todos los usuarios (solo admin)
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios', error });
  }
});

// Editar usuario (solo admin)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, email, password, role } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, { nombre, email, password, role }, { new: true });
    if (!updatedUser) return res.status(404).send('Usuario no encontrado');
    
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario', error });
  }
});

// Eliminar usuario (solo admin)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).send('Usuario no encontrado');

    res.status(200).send('Usuario eliminado');
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario', error });
  }
});

module.exports = router;
