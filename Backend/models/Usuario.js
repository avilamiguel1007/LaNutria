const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  usuario: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  password: {
    type: String,
    required: true
  },

  rol: {
    type: String,
    required: true,
    enum: ["administrador", "nutriologo", "paciente"]
  },

  activo: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;