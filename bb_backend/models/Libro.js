const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Esquema de libro
const libroSchema = new Schema({
    nombre: {
        type: String,
        required: true,
    },
    autor: {
        type: String,
        required: true,
    },
    isbn: {
        type: String,
        required: true,
        unique: true,
    },
    imagen: {
        type: String,
        required: true,
    },
    publicacion: {
        type: String,
        required: true,
    },
    cantidadDisponible: {
        type: Number,
        required: true,
    },
    genero: {
        type: String,
        required: true,
    }
});

const Libro = mongoose.model('Libro', libroSchema);

module.exports = Libro;
