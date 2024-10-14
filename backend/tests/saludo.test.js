// saludo.test.js
const saludo = require('../saludo');

describe('Función saludo', () => {
    it('debería devolver un saludo para el nombre dado', () => {
        const nombre = 'Carlos';
        const resultado = saludo(nombre);
        expect(resultado).toBe('Hola, Carlos!');
    });

    it('debería devolver un saludo para el nombre vacío', () => {
        const nombre = '';
        const resultado = saludo(nombre);
        expect(resultado).toBe('Hola, !'); // Comportamiento esperado si el nombre es vacío
    });
});
