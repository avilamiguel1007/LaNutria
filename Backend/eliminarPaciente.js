
require("dotenv").config();

const mongoose = require("mongoose");
const Paciente = require("./models/Paciente");

async function eliminarPaciente() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        const resultado = await Paciente.deleteOne({
            correo: "carlos@example.com"
        });

        console.log("Resultado de la eliminación:");
        console.log(resultado);

    } catch (error) {
        console.error("Error al eliminar:", error.message);
    } finally {
        await mongoose.disconnect();
    }
}

eliminarPaciente();
