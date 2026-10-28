
const mongoose = require("mongoose");

const pacienteSchema = new mongoose.Schema({
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

  edad: {
    type: Number,
    required: true,
    min: 18,
    max: 65
  }
});

const Paciente = mongoose.model("Paciente", pacienteSchema);

module.exports = Paciente;
