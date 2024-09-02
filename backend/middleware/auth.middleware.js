const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (token == null) return res.sendStatus(401); // Si no hay token

    console.log('Token secreto:', process.env.ACCESS_TOKEN_SECRET); // Agrega el console.log aquí para depurar


    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Token inválido
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
