
require("dotenv").config();

const mongoose = require("mongoose");
const Paciente = require("./models/Paciente");

async function asignarNutriologo() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const resultado = await Paciente.updateOne(
      { correo: "carlos@example.com" },
      {
        $set: {
          nutriologo: "6aed3011574fdef63c11b569"
        }
      }
    );

    console.log("Resultado de la asignación:");
    console.log(resultado);

  } catch (error) {
    console.error("Error:", error.message);

  } finally {
    await mongoose.disconnect();
  }
}

asignarNutriologo();
