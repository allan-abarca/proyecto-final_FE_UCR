const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/librosdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Conectado a MongoDB...'))
  .catch(err => console.error('No se pudo conectar a MongoDB', err));

// Definir el esquema y modelo de Usuario
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'normal'], default: 'normal' }
});

const User = mongoose.model('User', userSchema);

// Lista de usuarios
const users = [
  { email: "admin@admin.com", password: "Admin1234", role: "admin" },
  { email: "user@user.com", password: "User1234", role: "normal" }
];

// Insertar usuarios en MongoDB
async function seedUsers() {
  await User.deleteMany(); // Limpiar colección antes de insertar

  // Encriptar las contraseñas antes de insertar
  for (let user of users) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }

  await User.insertMany(users);
  console.log("Usuarios insertados");
  mongoose.connection.close();
}

seedUsers();
