
require("dotenv").config();

const mongoose = require("mongoose");
const Paciente = require("./models/Paciente");

async function actualizarPaciente() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        const resultado = await Paciente.updateOne(
            { correo: "carlos@example.com" },
            {
                $set: {
                    edad: 29
                }
            }
        );

        console.log("Resultado de la actualización:");
        console.log(resultado);

    } catch (error) {
        console.error("Error al actualizar:", error.message);
    } finally {
        await mongoose.disconnect();
    }
}

actualizarPaciente();
