const express = require("express");
const router = express.Router();
const Libro = require("../models/Libro");

// Crear un libro
router.post("/", async (req, res) => {
  const { nombre, autor, isbn, imagen, publicacion, cantidadDisponible, genero } = req.body;
  try {
    const nuevoLibro = new Libro({
      nombre,
      autor,
      isbn,
      imagen,
      publicacion,
      cantidadDisponible,
      genero
    });
    await nuevoLibro.save();
    res.status(201).json(nuevoLibro);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obtener todos los libros
router.get("/", async (req, res) => {
  try {
    const libros = await Libro.find();
    res.json(libros);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener un libro por ID
router.get("/:id", async (req, res) => {
  try {
    const libro = await Libro.findById(req.params.id);
    if (!libro) return res.status(404).json({ message: "Libro no encontrado" });
    res.json(libro);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Actualizar un libro
router.put("/:id", async (req, res) => {
  const { nombre, autor, isbn, imagen, publicacion, cantidadDisponible, genero } = req.body;
  try {
    const libroActualizado = await Libro.findByIdAndUpdate(
      req.params.id,
      { nombre, autor, isbn, imagen, publicacion, cantidadDisponible, genero },
      { new: true }
    );
    if (!libroActualizado)
      return res.status(404).json({ message: "Libro no encontrado" });
    res.json(libroActualizado);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar un libro
router.delete("/:id", async (req, res) => {
  try {
    const libroEliminado = await Libro.findByIdAndDelete(req.params.id);
    if (!libroEliminado) return res.status(404).json({ message: "Libro no encontrado" });
    res.json({ message: "Libro eliminado", libro: libroEliminado });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
