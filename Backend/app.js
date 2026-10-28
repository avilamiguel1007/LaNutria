require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

const Paciente = require("./models/Paciente");

const app = express();

const PORT = 3000;

// Ruta principal

app.get("/", (req, res) => {

res.send("Bienvenido al Sistema Nutricional");

});

// API para consultar pacientes

app.get("/api/pacientes", async (req, res) => {

try {

const pacientes = await Paciente.find();

res.json(pacientes);

} catch (error) {

res.status(500).json({

mensaje: "Error al consultar pacientes"

});

}

});

// Conectar MongoDB e iniciar servidor

async function iniciarServidor() {

try {

await mongoose.connect(process.env.MONGO_URI);

console.log("Conexión exitosa a MongoDB Atlas");

app.listen(PORT, () => {

console.log(`Servidor funcionando en http://localhost:${PORT}`);

});

} catch (error) {

console.error("Error:", error.message);

}

}

iniciarServidor();