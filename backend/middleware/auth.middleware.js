const jwt = require('jsonwebtoken'); // Importa el módulo para manejar JSON Web Tokens (JWT)
const dotenv = require('dotenv'); // Importa el módulo para cargar variables de entorno
dotenv.config(); // Carga las variables de entorno desde un archivo .env

// Middleware para autenticar el token JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']; // Obtiene el encabezado de autorización
    const token = authHeader && authHeader.split(' ')[1]; // Extrae el token del encabezado (si está presente)

    if (token == null) return res.sendStatus(401); // Responde con 401 si no hay token

    console.log('Token secreto:', process.env.ACCESS_TOKEN_SECRET); // Muestra el secreto del token para depuración

    // Verifica el token usando el secreto de la variable de entorno
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Responde con 403 si el token es inválido
        req.user = user; // Adjunta la información del usuario a la solicitud
        next(); // Llama al siguiente middleware o ruta
    });
};

module.exports = authenticateToken; // Exporta el middleware para usarlo en otras partes de la aplicación
