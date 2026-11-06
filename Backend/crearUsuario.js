
require("dotenv").config();

const mongoose = require("mongoose");
const argon2 = require("argon2");
const Usuario = require("./models/Usuario");

async function crearUsuario() {
  try {
    // Obtener datos desde la terminal
    const usuario = process.argv[2];
    const password = process.argv[3];
    const rol = process.argv[4];

    // Validar los datos
    if (!usuario || !password || !rol) {
      console.log(
        'Uso: node crearUsuario.js "usuario" "contraseña" "rol"'
      );
      return;
    }

    const rolesPermitidos = [
      "administrador",
      "nutriologo",
      "paciente"
    ];

    if (!rolesPermitidos.includes(rol)) {
      throw new Error("El rol indicado no es válido");
    }

    if (password.length < 8) {
      throw new Error("La contraseña debe tener al menos 8 caracteres");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    // Cifrar contraseña mediante Argon2
    const passwordHash = await argon2.hash(password);

    // Crear usuario
    const nuevoUsuario = new Usuario({
      usuario,
      password: passwordHash,
      rol
    });

    await nuevoUsuario.save();

    console.log("Usuario registrado correctamente:");
    console.log({
      usuario: nuevoUsuario.usuario,
      rol: nuevoUsuario.rol,
      activo: nuevoUsuario.activo,
      id: nuevoUsuario._id
    });

  } catch (error) {
    console.error("Error al crear usuario:", error.message);

  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
}

crearUsuario();
