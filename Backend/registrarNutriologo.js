
require("dotenv").config();

const mongoose = require("mongoose");
const Nutriologo = require("./models/Nutriologo");

async function registrarNutriologo() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const nuevoNutriologo = new Nutriologo({
      nombre: "Laura",
      apellido: "Martínez",
      correo: "laura@example.com",
      cedulaProfesional: "12345678",
      especialidad: "Nutrición clínica"
    });

    const resultado = await nuevoNutriologo.save();

    console.log("Nutriólogo registrado correctamente:");
    console.log(resultado);

  } catch (error) {
    console.error("Error al registrar:", error.message);

  } finally {
    await mongoose.disconnect();
  }
}

registrarNutriologo();
