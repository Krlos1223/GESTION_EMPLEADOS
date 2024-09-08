# Documentación del Módulo Backend

## Descripción General
El módulo backend está diseñado para gestionar la lógica del servidor, manejar solicitudes de clientes y realizar operaciones CRUD sobre los empleados en la base de datos. Utiliza Express para crear el servidor y Sequelize para interactuar con MySQL.

## Componentes

### 1. `package.json`
- **Descripción**: Archivo de configuración que define los scripts de inicio y las dependencias del proyecto.
- **Datos de Entrada**: 
  - No aplica.
- **Datos de Salida**: 
  - **Scripts**:
    - `start`: Inicia el servidor usando `nodemon` con el archivo `index.js`.
    - `dev`: Similar al script `start`, para desarrollo.
  - **Dependencias**:
    - `bcrypt`: Para encriptar contraseñas.
    - `cors`: Para habilitar solicitudes desde otros dominios.
    - `express`: Framework para el servidor web.
    - `morgan`: Herramienta para registrar solicitudes HTTP.
    - `mysql2`: Cliente para MySQL.
    - `sequelize`: ORM para interactuar con la base de datos.
    - `nodemon`: Herramienta para reiniciar automáticamente el servidor durante el desarrollo.

### 2. `.env`
- **Descripción**: Archivo para definir variables de entorno utilizadas en el proyecto.
- **Datos de Entrada**:
  - `ACCESS_TOKEN_SECRET`: Secreto para firmar y verificar tokens JWT.
- **Datos de Salida**:
  - No aplica (solo contiene variables de entorno).

### 3. `index.js`
- **Descripción**: Archivo principal para configurar y ejecutar el servidor Express.
- **Datos de Entrada**: 
  - `PORT`: Puerto en el que el servidor escuchará (por defecto `3000`).
- **Datos de Salida**:
  - **Consola**:
    - Mensaje indicando que el servidor está activo.
  - **Rutas**:
    - `/api/empleados`: Ruta para manejar solicitudes relacionadas con empleados.

### 4. `database.js`
- **Descripción**: Configuración de la conexión a la base de datos MySQL usando Sequelize.
- **Datos de Entrada**:
  - Configuración de conexión: `database`, `username`, `password`, `host`, `dialect`.
- **Datos de Salida**:
  - **Consola**:
    - Mensaje de éxito o error al conectar con MySQL.

### 5. `empleado.routes.js`
- **Descripción**: Define las rutas para manejar solicitudes HTTP relacionadas con empleados.
- **Datos de Entrada**:
  - Solicitudes HTTP: `POST /login`, `GET /`, `POST /`, `GET /:id`, `PUT /:id`, `DELETE /:id`.
- **Datos de Salida**:
  - **Respuestas**:
    - `POST /login`: Token JWT y mensaje de éxito.
    - `GET /`: Lista de empleados.
    - `POST /`: Empleado creado.
    - `GET /:id`: Datos del empleado.
    - `PUT /:id`: Empleado actualizado.
    - `DELETE /:id`: Mensaje de éxito o error.

### 6. `empleado.js`
- **Descripción**: Modelo Sequelize para la tabla de empleados en la base de datos.
- **Datos de Entrada**:
  - Campos del modelo: `usuario_id`, `nombre`, `apellido`, `cedula`, `fecha_de_nacimiento`, `rol`, `nombre_de_usuario`, `contraseña`.
- **Datos de Salida**:
  - **Datos del Modelo**:
    - Representación de los empleados en la base de datos.

### 7. `auth.middleware.js`
- **Descripción**: Middleware para autenticar tokens JWT.
- **Datos de Entrada**:
  - Encabezado de autorización con el token JWT.
- **Datos de Salida**:
  - **Respuestas**:
    - `401`: Si no hay token.
    - `403`: Si el token es inválido.
    - Adjunta información del usuario a la solicitud si el token es válido.

### 8. `empleado.controller.js`
- **Descripción**: Controlador que maneja la lógica para las operaciones CRUD relacionadas con empleados.
- **Datos de Entrada**:
  - Solicitudes HTTP con datos del empleado y credenciales de inicio de sesión.
- **Datos de Salida**:
  - **Respuestas**:
    - `loginEmpleados`: Token JWT y mensaje de éxito.
    - `getEmpleados`: Lista de empleados.
    - `createEmpleados`: Empleado creado.
    - `getUnicoEmpleado`: Datos del empleado específico.
    - `editarEmpleado`: Empleado actualizado.
    - `eliminarEmpleado`: Mensaje de éxito o error.

## Consideraciones Adicionales
- **Errores y Mensajes**: Cada componente incluye manejo de errores y mensajes apropiados para depuración y respuesta al usuario.
- **Configuración del Servidor**: Asegúrate de que el archivo `.env` esté configurado correctamente antes de ejecutar el backend.

