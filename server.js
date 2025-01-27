const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const users = {}; // Base de datos simulada

// Endpoint para registro/inicio de sesión
app.post("/register", (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: "Correo requerido." });
  }

  // Validar si el correo ya está registrado
  if (!users[email]) {
    users[email] = { email, premium: false };
    console.log("Usuario registrado:", email);
  } else {
    console.log("Usuario existente:", email);
  }

  res.json({ success: true, message: "Registro exitoso." });
});

// Endpoint para verificar estado de Premium
app.post("/check-premium", (req, res) => {
  const { email } = req.body;
  if (!email || !users[email]) {
    return res.status(404).json({ success: false, message: "Usuario no encontrado." });
  }

  res.json({ success: true, premium: users[email].premium });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
