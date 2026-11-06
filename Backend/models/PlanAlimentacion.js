
const mongoose = require("mongoose");

const planAlimentacionSchema = new mongoose.Schema({

  nombre: {
    type: String,
    required: true
  },

  paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paciente",
    required: true
  },

  nutriologo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Nutriologo",
    required: true
  },

  objetivo: {
    type: String,
    required: true
  },

  fechaInicio: {
    type: Date,
    required: true
  },

  fechaFin: {
    type: Date,
    required: true
  },

  comidas: [{
    tipo: {
      type: String,
      enum: [
        "Desayuno",
        "Colacion",
        "Comida",
        "Cena"
      ],
      required: true
    },

    alimentos: [{
      alimento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Alimento",
        required: true
      },

      cantidad: {
        type: Number,
        required: true,
        min: 0
      },

      unidad: {
        type: String,
        required: true
      }
    }]
  }],

  estado: {
    type: String,
    enum: ["Activo", "Finalizado", "Cancelado"],
    default: "Activo"
  }

}, { timestamps: true });

const PlanAlimentacion = mongoose.model(
  "PlanAlimentacion",
  planAlimentacionSchema
);

module.exports = PlanAlimentacion;
