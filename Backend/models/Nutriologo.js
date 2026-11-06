
const mongoose = require("mongoose");

const nutriologoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },

  apellido: {
    type: String,
    required: true
  },

  correo: {
    type: String,
    required: true,
    unique: true
  },

  cedulaProfesional: {
    type: String,
    required: true,
    unique: true
  },

  especialidad: {
    type: String,
    required: true
  }
});

const Nutriologo = mongoose.model("Nutriologo", nutriologoSchema);

module.exports = Nutriologo;
