
const express = require("express");

const router = express.Router();

const { login } = require("../Controller/AuthController");

// Ruta para iniciar sesión
router.post("/login", login);

module.exports = router;
