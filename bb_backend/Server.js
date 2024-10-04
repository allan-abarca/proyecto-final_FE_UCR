const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const libroRoutes = require('./Routes/libroRoutes'); 
const userRoutes = require('./Routes/userRoutes');
const loginRouter = require('./Routes/login'); // adjust the path accordingly


const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexión con MongoDB (local en este caso)
mongoose.connect('mongodb://localhost:27017/librosdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.log(err));

// Rutas para libros y usuarios
app.use('/api/libros', libroRoutes);
app.use('/api/users', userRoutes);

// Puerto del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

