const jwt = require('jsonwebtoken'); // Importa el módulo para trabajar con JSON Web Tokens (JWT)
const Empleado = require('../models/empleado'); // Importa el modelo de empleado
const bcrypt = require('bcrypt'); // Importa el módulo para gestionar contraseñas de manera segura

const empleadoCtrl = {};

// Método para el inicio de sesión
empleadoCtrl.loginEmpleados = async (req, res) => {
    const { nombre_de_usuario, contraseña } = req.body; // Obtiene los datos del cuerpo de la solicitud

    try {
        console.log('ACCESS_TOKEN_SECRET:', process.env.ACCESS_TOKEN_SECRET); // Muestra el secreto del token para depuración

        // Busca al empleado por nombre de usuario
        const empleado = await Empleado.findOne({ where: { nombre_de_usuario } });
        if (!empleado) {
            return res.status(400).json({ message: 'Usuario no encontrado' }); // Responde si no encuentra el usuario
        }

        // Compara la contraseña proporcionada con la almacenada en la base de datos
        const isMatch = await bcrypt.compare(contraseña, empleado.contraseña);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' }); // Responde si la contraseña no coincide
        }

        // Genera un token JWT para el usuario
        const token = jwt.sign({ id: empleado.id, nombre_de_usuario: empleado.nombre_de_usuario }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        
        // Responde con el mensaje de éxito y el token generado
        res.status(200).json({
            message: 'Autenticación satisfactoria',
            token: token, // Envía el token de autenticación
            nombre: empleado.nombre // Envía el nombre del empleado
        });

    } catch (error) {
        console.error('Error en la autenticación:', error); // Muestra el error si ocurre uno
        res.status(500).json({ message: 'Error en la autenticación', error });
    }
};

// Obtener todos los empleados
empleadoCtrl.getEmpleados = async (req, res) => {
    try {
        const empleados = await Empleado.findAll(); // Obtiene todos los empleados
        res.json(empleados); // Responde con la lista de empleados
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener empleados' }); // Responde con error si ocurre uno
    }
}

// Crear un nuevo empleado
empleadoCtrl.createEmpleados = async (req, res) => {
    try {
        const empleado = await Empleado.create(req.body); // Crea un nuevo empleado en la base de datos
        res.json({ status: 'Empleado guardado', empleado }); // Responde con el empleado creado
    } catch (error) {
        console.error('Error al guardar empleado:', error); // Muestra el error si ocurre uno
        res.status(500).json({ error: 'Error al guardar empleado', details: error.message }); // Responde con error
    }
}

// Obtener un único empleado por ID
empleadoCtrl.getUnicoEmpleado = async (req, res) => {
    try {
        const empleado = await Empleado.findByPk(req.params.id, {
            attributes: { exclude: ['contraseña'] } // Excluye la contraseña de los datos enviados
        });

        if (empleado) {
            const fechaNacimiento = empleado.fecha_de_nacimiento.toISOString().split('T')[0]; // Formatea la fecha de nacimiento a YYYY-MM-DD
            console.log('Fecha de nacimiento en el backend (formateada):', fechaNacimiento); // Muestra la fecha formateada

            const empleadoData = {
                ...empleado.toJSON(),
                fecha_de_nacimiento: fechaNacimiento // Incluye la fecha de nacimiento formateada
            };

            res.json(empleadoData); // Responde con los datos del empleado
        } else {
            res.status(404).json({ error: 'Empleado no encontrado' }); // Responde si el empleado no se encuentra
        }
    } catch (error) {
        console.error('Error al obtener empleado:', error); // Muestra el error si ocurre uno
        res.status(500).json({ error: 'Error al obtener empleado' }); // Responde con error
    }
};

// Actualizar los datos de un empleado
empleadoCtrl.editarEmpleado = async (req, res) => {
    try {
        const empleado = await Empleado.findByPk(req.params.id); // Busca el empleado por ID

        if (!empleado) {
            return res.status(404).json({ error: 'Empleado no encontrado' }); // Responde si el empleado no se encuentra
        }

        // Excluye la contraseña si no se proporciona una nueva
        const { contrasena, ...updatedFields } = req.body;

        // Si se proporciona una nueva contraseña, encripta la contraseña antes de actualizar
        if (contrasena && contrasena !== '') {
            const salt = await bcrypt.genSalt(10); // Genera una sal para la contraseña
            updatedFields.contraseña = await bcrypt.hash(contrasena, salt); // Encripta la nueva contraseña
        }

        // Actualiza el empleado con los datos proporcionados
        await Empleado.update(updatedFields, { where: { usuario_id: req.params.id } });

        const updatedEmpleado = await Empleado.findByPk(req.params.id); // Obtiene el empleado actualizado
        res.json({ status: 'Empleado actualizado', updatedEmpleado }); // Responde con el empleado actualizado

    } catch (error) {
        console.error('Error al actualizar empleado:', error); // Muestra el error si ocurre uno
        res.status(500).json({ error: 'Error al actualizar empleado' }); // Responde con error
    }
}

// Eliminar un empleado por ID
empleadoCtrl.eliminarEmpleado = async (req, res) => {
    try {
        const deleted = await Empleado.destroy({
            where: { usuario_id: req.params.id } // Busca el empleado por ID para eliminar
        });
        if (deleted) {
            res.json({ status: 'Empleado eliminado' }); // Responde con éxito si se elimina el empleado
        } else {
            res.status(404).json({ error: 'Empleado no encontrado' }); // Responde si el empleado no se encuentra
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar empleado' }); // Responde con error si ocurre uno
    }
}

module.exports = empleadoCtrl; // Exporta el controlador para que pueda ser utilizado en otras partes de la aplicación
