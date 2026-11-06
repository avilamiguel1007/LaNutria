
require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Paciente = require("./models/Paciente");
const authRoutes = require("./Routes/AuthRoute");

const app = express();

const PORT = 3000;

// Permitir solicitudes desde React
app.use(cors({
  origin: "http://localhost:3001",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Permitir recibir información JSON
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
  res.send("Bienvenido al Sistema Nutricional");
});

// Rutas de autenticación
app.use("/api/auth", authRoutes);

// API para consultar pacientes
app.get("/api/pacientes", async (req, res) => {
  try {
    const pacientes = await Paciente.find()
      .populate("nutriologo");

    res.status(200).json(pacientes);

  } catch (error) {
    console.error("Error al consultar pacientes:", error.message);

    res.status(500).json({
      mensaje: "Error al consultar pacientes"
    });
  }
});

// Conectar MongoDB e iniciar servidor
async function iniciarServidor() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Conexión exitosa a MongoDB Atlas");

    app.listen(PORT, () => {
      console.log(
        `Servidor funcionando en http://localhost:${PORT}`
      );
    });

  } catch (error) {
    console.error("Error al iniciar el servidor:", error.message);
  }
}

iniciarServidor();
