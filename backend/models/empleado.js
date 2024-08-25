const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../database'); // Importa la instancia de Sequelize

// Define el modelo de empleado para la tabla 'usuarios'
const Empleado = sequelize.define('Empleado', {
    // ID único para cada empleado, se incrementa automáticamente
    usuario_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    // Nombre del empleado, no puede ser nulo
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // Apellido del empleado, no puede ser nulo
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // Cédula del empleado, no puede ser nulo
    cedula: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // Fecha de nacimiento del empleado, no puede ser nulo
    fecha_de_nacimiento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    // Rol del empleado (por ejemplo, Administrador, Usuario), no puede ser nulo
    rol: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // Nombre de usuario único para el empleado, no puede ser nulo
    nombre_de_usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    // Contraseña del empleado, no puede ser nula
    contraseña: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // Nombre de la tabla en la base de datos
    tableName: 'usuarios', // Asegúrate de usar el nombre correcto de la tabla
    // Desactiva los campos de fecha de creación y actualización automáticos
    timestamps: false
});

// Hook para encriptar la contraseña antes de guardar el empleado
Empleado.beforeCreate(async (empleado, options) => {
    const salt = await bcrypt.genSalt(10); // Genera un salt para encriptar la contraseña
    empleado.contraseña = await bcrypt.hash(empleado.contraseña, salt); // Encripta la contraseña
});

// Exporta el modelo para usarlo en otras partes de la aplicación
module.exports = Empleado;
