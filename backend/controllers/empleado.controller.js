const jwt = require('jsonwebtoken');
const Empleado = require('../models/empleado'); // Usa el nombre correcto del modelo
const bcrypt = require('bcrypt');

const empleadoCtrl = {};

empleadoCtrl.loginEmpleados = async (req, res) => {
    const { nombre_de_usuario, contraseña } = req.body;

    try {
        // Log para verificar la variable de entorno
        console.log('ACCESS_TOKEN_SECRET:', process.env.ACCESS_TOKEN_SECRET);

        // Busca al usuario en la base de datos por nombre de usuario
        const empleado = await Empleado.findOne({ where: { nombre_de_usuario } });
        if (!empleado) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        // Compara la contraseña proporcionada con la almacenada
        const isMatch = await bcrypt.compare(contraseña, empleado.contraseña);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

         // Genera un token JWT
         const token = jwt.sign({ id: empleado.id, nombre_de_usuario: empleado.nombre_de_usuario }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
         
        // Envía la respuesta con el nombre del usuario y un token (si es necesario)
        res.status(200).json({
            message: 'Autenticación satisfactoria',
            token: token, // Genera y devuelve un token si es necesario
            nombre: empleado.nombre // Envía el nombre del usuario
        });        

    } catch (error) {      
        console.error('Error en la autenticación:', error); // Agrega un log de error más detallado  
        res.status(500).json({ message: 'Error en la autenticación', error });
    }
};

// Obtener todos los empleados
empleadoCtrl.getEmpleados = async (req, res) => {
    try {
        const empleados = await Empleado.findAll(); // Usar findAll() de Sequelize
        res.json(empleados);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener empleados' });
    }
}

// Crear empleado
empleadoCtrl.createEmpleados = async (req, res) => {
    try {
        const empleado = await Empleado.create(req.body); // Sequelize manejará el campo auto-incremental
        res.json({ status: 'Empleado guardado', empleado });
    } catch (error) {        
        console.error('Error al guardar empleado:', error);
        res.status(500).json({ error: 'Error al guardar empleado', details: error.message });
    }
}


// Conseguir un único empleado
empleadoCtrl.getUnicoEmpleado = async (req, res) => {
    try {
        const empleado = await Empleado.findByPk(req.params.id); // Usar findByPk() de Sequelize
        if (empleado) {
            res.json(empleado);
        } else {
            res.status(404).json({ error: 'Empleado no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener empleado' });
    }
}

// Actualizar empleado
empleadoCtrl.editarEmpleado = async (req, res) => {
    try {
        const [updated] = await Empleado.update(req.body, {
            where: { usuario_id: req.params.id }
        });
        if (updated) {
            const updatedEmpleado = await Empleado.findByPk(req.params.id);
            res.json({ status: 'Empleado actualizado', updatedEmpleado });
        } else {
            res.status(404).json({ error: 'Empleado no encontrado' });
        }
    } catch (error) {
        console.error('Error al guardar empleado:', error);
        res.status(500).json({ error: 'Error al actualizar empleado' });
    }
}

// Eliminar empleado
empleadoCtrl.eliminarEmpleado = async (req, res) => {
    try {
        const deleted = await Empleado.destroy({
            where: { usuario_id: req.params.id }
        });
        if (deleted) {
            res.json({ status: 'Empleado eliminado' });
        } else {
            res.status(404).json({ error: 'Empleado no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar empleado' });
    }
}

module.exports = empleadoCtrl;
