const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Conexión con MongoDB
mongoose.connect('mongodb://localhost:27017/librosdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDb Connected'))
  .catch(err => console.log(err));

// Ruta para libros
const libroRoutes = require('./Routes/libroRoutes');
app.use('/api/libros', libroRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
