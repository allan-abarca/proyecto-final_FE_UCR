const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
     type: String, enum: ['normal', 'admin'],
      default: 'normal', required:true },
  librosTomados: [
    {
      libroId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Libro',
      },
      fechatomado:{
        type: Date,
        default: Date.now
      }
    }
  ],
});

const User = mongoose.model('User', userSchema);
module.exports = User;