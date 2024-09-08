const express = require('express'); // Importa el módulo express para crear el enrutador
const router = express.Router(); // Crea un nuevo enrutador de express
const empleadoCtrl = require('../controllers/empleado.controller'); // Importa el controlador para manejar las solicitudes relacionadas con empleados
const authenticateToken = require('../middleware/auth.middleware'); // Importa el middleware para autenticar tokens

// Ruta para el inicio de sesión
router.post('/login', empleadoCtrl.loginEmpleados); // Maneja las solicitudes POST para iniciar sesión

// Rutas para gestionar empleados
router.get('/', empleadoCtrl.getEmpleados); // Obtiene todos los empleados
router.post('/', empleadoCtrl.createEmpleados); // Guarda un nuevo empleado
router.get('/:id', empleadoCtrl.getUnicoEmpleado); // Obtiene un empleado específico por ID
router.put('/:id', empleadoCtrl.editarEmpleado); // Actualiza los datos de un empleado específico
router.delete('/:id', empleadoCtrl.eliminarEmpleado); // Elimina un empleado específico

// Ruta protegida que requiere autenticación
router.get('/admin', authenticateToken, empleadoCtrl.getEmpleados); // Obtiene todos los empleados, pero solo si el token de autenticación es válido

module.exports = router; // Exporta el enrutador para que pueda ser usado en otras partes de la aplicación
