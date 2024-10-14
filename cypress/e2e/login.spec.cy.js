describe('Pruebas de aceptación para el login', () => {
  it('Debe hacer login con éxito', () => {
    // Visita la página de login en el frontend (puerto 4200)
    cy.visit('http://localhost:4200/login'); // URL del servidor

    // Completa el formulario de login
    cy.get('input[name="nombre_de_usuario"]').type('us-cpi');
    cy.get('input[name="contraseña"]').type('0123456789');
    
    // Envía el formulario
    cy.get('button[type="submit"]').click();

    // Verifica que se redirige o muestra un mensaje de éxito
    cy.url().should('include', '/admin'); // Ruta esperada después del login    
  });
});
