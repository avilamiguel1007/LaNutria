
require("node:dns").setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();

const mongoose = require("mongoose");
const Paciente = require("./models/Paciente");

// Debe coincidir con el nombre de la variable en .env
const MONGO_URI = process.env.MONGODB_URI;

async function conectarDB() {
  try {
    // 1. Conectar con MongoDB Atlas
    if (!MONGO_URI) {
      throw new Error("No se encontró MONGODB_URI en el archivo .env");
    }

    await mongoose.connect(MONGO_URI);
    console.log("Conexión exitosa a MongoDB Atlas");

    // 2. Crear un nuevo paciente
    const nuevoPaciente = new Paciente({
      nombre: "Carlos",
      apellido: "López",
      correo: "carlos@example.com",
      edad: 28
    });

    // 3. Guardar el paciente en MongoDB
    const resultado = await nuevoPaciente.save();

    console.log("Paciente registrado correctamente:");
    console.log(resultado);

  } catch (error) {
    console.error("Error:", error.message);

  } finally {
    // 4. Cerrar la conexión si está abierta
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
}

conectarDB();
