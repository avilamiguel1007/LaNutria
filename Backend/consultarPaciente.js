require("dotenv").config();

const mongoose = require("mongoose");
const Paciente = require("./models/Paciente");

async function consultarPacientes() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("Conexión exitosa a MongoDB Atlas");

        const pacientes = await Paciente.find();

        console.log("Pacientes encontrados:");
        console.log(pacientes);
    } catch (error) {
        console.error("Error al consultar:", error.message);
    } finally {
        await mongoose.disconnect();
    }
}

consultarPacientes();