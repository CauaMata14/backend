const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Por favor, insira um e-mail válido']
  },
  senha: {
    type: String,
    required: true,
    minlength: 6
  }
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      delete ret.senha;
      return ret;
    }
  }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
