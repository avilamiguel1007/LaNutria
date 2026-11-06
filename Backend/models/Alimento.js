
const mongoose = require("mongoose");

const alimentoSchema = new mongoose.Schema({

  nombre: {
    type: String,
    required: true,
    trim: true
  },

  categoria: {
    type: String,
    required: true,
    enum: [
      "Frutas",
      "Verduras",
      "Carnes",
      "Cereales",
      "Lacteos",
      "Legumbres",
      "Grasas",
      "Otros"
    ]
  },

  porcion: {
    type: String,
    required: true
  },

  calorias: {
    type: Number,
    required: true,
    min: 0
  },

  proteinas: {
    type: Number,
    required: true,
    min: 0
  },

  carbohidratos: {
    type: Number,
    required: true,
    min: 0
  },

  grasas: {
    type: Number,
    required: true,
    min: 0
  },

  fibra: {
    type: Number,
    default: 0,
    min: 0
  }

}, { timestamps: true });

const Alimento = mongoose.model("Alimento", alimentoSchema);

module.exports = Alimento;
