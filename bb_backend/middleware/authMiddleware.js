
const User = require('../Models/user');

// Middleware para verificar si el usuario es admin
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId); // Aquí se espera el userId en la request sino aplica deniega 
    if (user && user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: "Acceso denegado. Solo administradores permitidos." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { isAdmin };
//esto es una opcion para proteguer las rutas
//esto es una opcion para proteguer las rutas
