const empleadoCtrl = require('../controllers/empleado.controller'); // Importar el controlador
const  Empleado  = require('../models/empleado'); // Importar el modelo de empleado
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Mock de las dependencias
jest.mock('../models/empleado', () => ({
    findOne: jest.fn(),
  }));
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('Pruebas para loginEmpleados', () => {
    let req, res;

    beforeEach(() => {
        // Crear mocks de request y response
        req = {
            body: {
                nombre_de_usuario: 'us-cpi',
                contraseña: '0123456789'
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it('Debe responder con 400 si el usuario no es encontrado', async () => {
        // Mock para que `Empleado.findOne` retorne null
        Empleado.findOne.mockResolvedValue(null);

        // Llamar a la función de login
        await empleadoCtrl.loginEmpleados(req, res);

        // Asegurarse que retorna un status 400
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Usuario no encontrado' });
    });

    it('Debe responder con 400 si la contraseña es incorrecta', async () => {
        // Mock para encontrar al empleado
        Empleado.findOne.mockResolvedValue({ nombre_de_usuario: 'us-cpi', contraseña: '0123456789' });
        
        // Mock para que `bcrypt.compare` retorne false
        bcrypt.compare.mockResolvedValue(false);

        // Llamar a la función de login
        await empleadoCtrl.loginEmpleados(req, res);

        // Asegurarse que retorna un status 400
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Contraseña incorrecta' });
    });

    it('Debe responder con 200 y retornar el token si el login es exitoso', async () => {
        // Mock para encontrar al empleado
        Empleado.findOne.mockResolvedValue({ id: 39, nombre_de_usuario: 'us-cpi', contraseña: '0123456789', nombre: 'Empleado Prueba' });
        
        // Mock para que `bcrypt.compare` retorne true
        bcrypt.compare.mockResolvedValue(true);

        // Mock para generar el token
        jwt.sign.mockReturnValue('tokenGenerado');

        // Llamar a la función de login
        await empleadoCtrl.loginEmpleados(req, res);

        // Asegurarse que retorna un status 200 y el token
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Autenticación satisfactoria',
            token: 'tokenGenerado',
            nombre: 'Empleado Prueba'
        });
    });

    it('Debe responder con 500 si ocurre un error en la autenticación', async () => {
        // Mock para que `Empleado.findOne` lance un error
        Empleado.findOne.mockRejectedValue(new Error('Error en la base de datos'));

        // Llamar a la función de login
        await empleadoCtrl.loginEmpleados(req, res);

        // Asegurarse que retorna un status 500
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Error en la autenticación', error: new Error('Error en la base de datos') });
    });
});
