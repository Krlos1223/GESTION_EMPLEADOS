const dotenv = require('dotenv'); // Para manejar variables de entorno
const express = require('express'); // Framework para crear el servidor web
const morgan = require('morgan'); // Herramienta para registrar las solicitudes HTTP
const cors = require('cors'); // Permite solicitudes desde otros dominios
const app = express(); // Crea una instancia de la aplicación Express
const sequelize = require('./database'); // Importa la configuración para conectar con la base de datos

dotenv.config(); // Carga las variables de entorno desde un archivo .env

// Configuración del servidor
app.set('port', process.env.PORT || 3000); // Establece el puerto en el que el servidor escuchará
app.use(morgan('dev')); // Muestra información sobre las solicitudes en la consola
app.use(express.json()); // Permite al servidor entender los datos en formato JSON que recibe del cliente
app.use(cors({ origin: 'http://localhost:4200' })); // Permite que el servidor acepte solicitudes del cliente en el puerto 4200

// Rutas del servidor
app.use('/api/empleados', require('./routes/empleado.routes')); // Configura las rutas para manejar las solicitudes relacionadas con empleados

// Inicia el servidor
if (require.main === module) {
    app.listen(app.get('port'), () => { // Escucha en el puerto especificado
        console.log('server activo en el puerto', app.get('port')); // Mensaje en la consola cuando el servidor esté activo
    });
}

module.exports = app; // Exporta la app para que pueda ser utilizada en las pruebas
