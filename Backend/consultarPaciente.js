
require("dotenv").config();

const mongoose = require("mongoose");
const Nutriologo = require("./models/Nutriologo");
const Paciente = require("./models/Paciente");

async function consultarPacientes() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("Conexión exitosa a MongoDB Atlas");

        const pacientes = await Paciente.find()
            .populate("nutriologo");

        console.log("Pacientes encontrados:");
        console.log(JSON.stringify(pacientes, null, 2));

    } catch (error) {
        console.error("Error al consultar:", error.message);
    } finally {
        await mongoose.disconnect();
    }
}

consultarPacientes();
