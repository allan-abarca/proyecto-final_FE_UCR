const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../Models/user');
const { isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

// Obtener todos los usuarios (solo admin)
router.get('/', isAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear un nuevo usuario (solo admin)
router.post('/', isAdmin, async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      role
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obtener un usuario por ID (solo admin)
router.get('/:id', isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Actualizar un usuario (solo admin)
router.put('/:id', isAdmin, async (req, res) => {
  const { email, role } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { email, role },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar un usuario (solo admin)
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ message: "Usuario eliminado", user: deletedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
