
const Usuario = require("../models/Usuario");
const argon2 = require("argon2");

// Controlador para iniciar sesión
async function login(req, res) {
  try {
    const { usuario, password } = req.body;

    // Verificar que se reciban los datos
    if (!usuario || !password) {
      return res.status(400).json({
        mensaje: "Debes ingresar usuario y contraseña"
      });
    }

    // Buscar el usuario en MongoDB
    const usuarioEncontrado = await Usuario.findOne({
      usuario: usuario
    });

    if (!usuarioEncontrado) {
      return res.status(401).json({
        mensaje: "Usuario o contraseña incorrectos"
      });
    }

    // Verificar si la cuenta está activa
    if (!usuarioEncontrado.activo) {
      return res.status(403).json({
        mensaje: "La cuenta se encuentra desactivada"
      });
    }

    // Comparar contraseña con el hash Argon2
    const passwordCorrecta = await argon2.verify(
      usuarioEncontrado.password,
      password
    );

    if (!passwordCorrecta) {
      return res.status(401).json({
        mensaje: "Usuario o contraseña incorrectos"
      });
    }

    // Respuesta de inicio de sesión correcto
    return res.status(200).json({
      mensaje: "Inicio de sesión correcto",
      usuario: {
        id: usuarioEncontrado._id,
        usuario: usuarioEncontrado.usuario,
        rol: usuarioEncontrado.rol
      }
    });

  } catch (error) {
    console.error("Error en login:", error.message);

    return res.status(500).json({
      mensaje: "Error interno al iniciar sesión"
    });
  }
}

module.exports = { login };
