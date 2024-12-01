const jwt = require('jsonwebtoken');
const secretKey = "clave_secreta"; // Clave secreta

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Se espera "Bearer <token>"
  
  if (!token) {
    return res.status(401).json({ error: "Acceso denegado. Token no proporcionado." });
  }

  try {
    const decoded = jwt.verify(token, secretKey); // Valida el token
    req.user = decoded; // Agrega los datos del usuario a la solicitud
    next(); // Permite el acceso
  } catch (error) {
    return res.status(403).json({ error: "Token inválido o expirado." });
  }
};

module.exports = authMiddleware;
