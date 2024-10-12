
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const app = express();
const PORT = 5000;
const libroRoutes = require('./Routes/librosRoutes');
const User = require('./models/User');

// Configurar CORS 
app.use(cors({
    origin: 'http://localhost:3000' }));
// Conexión MongoDB Atlas
mongoose.connect('mongodb+srv://djvm1591:GaW7jHT35hjoXfNl@cluster0.rmq6q.mongodb.net/simpleLogin?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Conectado a la base de datos'))
  .catch((err) => console.log(err));

// Middleware
app.use(express.json());
app.post('/api/register', async (req, res) => {
  const { email, password, role } = req.body;
  // ojo si  el usuario ya existe dara error 
  const existUser = await User.findOne({ email });
  if (existUser) return res.status(400).send('El usuario ya existe');

  // Crear un nuevo usuario
  const newUser = new User({ nombre,email, password, role });
  await newUser.save();

  res.status(201).json(newUser);
});

// Ruta para registrar usuarios (solo admin)
app.post('/api/users', async (req, res) => {
  const { nombre,email, password, role } = req.body;

  // Validación si el usuario ya existe aqui
  const existUser = await User.findOne({ email });
  if (existUser) return res.status(400).send('El usuario ya existe');

  // como crear un nuevo usuario
  const newUser = new User({ nombre,email, password, role });
  await newUser.save();

  res.status(201).json(newUser);
});

// Ruta de inicio de sesión
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Comparar la contraseña en texto plano (no es seguro)
    if (user.password !== password) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Enviar la respuesta con el rol del usuario
    res.status(200).json({ role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Error al procesar el login', error });
  }
});

// Listar usuarios (solo admin)
app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

// Editar usuario (solo admin)
app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, email, password, role } = req.body;

  try {
    // Buscar el usuario existente
    const user = await User.findById(id);
    if (!user) return res.status(404).send('Usuario no encontrado');

    // Actualizar solo los campos modificados
    if (nombre) user.nombre = nombre;
    if (email) user.email = email;
    if (role) user.role = role;
    // Solo actualizar la contraseña si se proporciona
    if (password) user.password = password;

    await user.save();  // Guardar los cambios en la ruta del server 

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario', error });
  }
});

// Eliminar usuario (solo admin)
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const deletedUser = await User.findByIdAndDelete(id);
  
  if (!deletedUser) return res.status(404).send('Usuario no encontrado');
  
  res.status(200).send('Usuario eliminado');
});
app.use('/api/libros', libroRoutes); 

// Inicializar servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
