# Módulo Frontend

## Descripción General

El módulo frontend de la aplicación `GESTION_EMPLEADOS` está construido utilizando Angular. Este módulo se encarga de proporcionar la interfaz de usuario y gestionar la interacción con el backend a través de una serie de componentes y servicios.

## Estructura

El módulo frontend se organiza en varias partes clave:

- **Componentes**: Representan las diferentes vistas y elementos de la interfaz de usuario. Incluyen:
  - `AppComponent`: Componente raíz que gestiona el enrutamiento y la visualización de otros componentes.
  - `LoginComponent`: Componente para el inicio de sesión.
  - `EmpleadosComponent`: Componente para gestionar empleados.
  - `HeaderComponent`, `FooterComponent`, `SidebarComponent`: Componentes para la navegación y el diseño general.
  - `RegistroComponent`, `AdminComponent`, `SidebarAdminComponent`, `HeaderAuthComponent`, `NosotrosComponent`: Otros componentes específicos para diferentes secciones de la aplicación.

- **Servicios**: Encargados de la lógica de negocio y la comunicación con el backend. Incluyen:
  - `AutenticacionService`: Maneja la autenticación del usuario.
  - `EmpleadoService`: Realiza operaciones CRUD para los empleados.

- **Guardias**: Implementan lógica para proteger rutas que requieren autenticación. Incluye:
  - `AuthGuard`: Verifica si el usuario está autenticado antes de permitir el acceso a ciertas rutas.

- **Módulos**:
  - `AppModule`: Módulo raíz que declara y configura los componentes y módulos necesarios para la aplicación.
  - `AppRoutingModule`: Configura las rutas de la aplicación y el enrutamiento.

## Funcionalidad

- **Autenticación**: Maneja el inicio y cierre de sesión de usuarios, y protege rutas que requieren autenticación.
- **Gestión de Empleados**: Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los datos de los empleados.
- **Navegación**: Proporciona una estructura de navegación consistente a través de componentes como `Header`, `Footer`, y `Sidebar`.
- **Interacción con el Backend**: Utiliza servicios para enviar y recibir datos del backend a través de peticiones HTTP.

## Dependencias

- **Angular Core**: Para la construcción de la aplicación y el manejo de componentes.
- **Angular Router**: Para la gestión del enrutamiento y las rutas.
- **HttpClient**: Para realizar peticiones HTTP al backend.

El frontend está diseñado para ofrecer una experiencia de usuario fluida y eficiente, con un enfoque en la gestión de empleados y la autenticación de usuarios.

### 1. AuthGuard

**Descripción**
`AuthGuard` es un guard que implementa `CanActivate` para proteger las rutas que requieren autenticación.

**Métodos**
`canActivate()`

**Descripción**: Verifica si el usuario está autenticado. Permite el acceso a la ruta si el usuario está autenticado, de lo contrario, redirige a la página de inicio de sesión.

**Datos de entrada**: Ninguno

**Datos de salida**: `boolean`  
- `true`: Si el usuario está autenticado.
- `false`: Si el usuario no está autenticado.

**Dependencias**
- `AutenticacionService`: Para verificar la autenticación del usuario.
- `Router`: Para redirigir al usuario a la página de inicio de sesión si no está autenticado.

### 2. AppComponent

**Descripción**
`AppComponent` es el componente raíz que gestiona el enrutamiento y la visualización de componentes de encabezado y pie de página.

**Métodos**
`isPublicPage()`

**Descripción**: Verifica si la ruta actual es una ruta pública que no requiere el botón de "Salir" en el encabezado.

**Datos de entrada**: Ninguno

**Datos de salida**: `boolean`  
- `true`: Si la ruta actual está en la lista de rutas públicas.
- `false`: Si la ruta actual no está en la lista de rutas públicas.

**Dependencias**
- `Router`: Para obtener la URL actual y determinar la ruta pública.

### 3. EmpleadoService

**Descripción**
`EmpleadoService` gestiona las operaciones CRUD para los empleados y transforma los datos entre el frontend y el backend.

**Métodos**
`getEmpleados()`

**Descripción**: Obtiene todos los empleados desde el backend.

**Datos de entrada**: Ninguno

**Datos de salida**: `Observable<Empleado[]>`  

- Lista de empleados transformados del formato del backend al formato `Empleado`.

`postEmpleado(empleado: Empleado)`

**Descripción**: Envía un nuevo empleado al backend.

**Datos de entrada**: `Empleado`  
- `empleado`: El nuevo empleado a ser creado.

**Datos de salida**: `Observable<any>`  
- Respuesta del backend.

`putEmpleado(empleado: Empleado)`

**Descripción**: Actualiza un empleado existente en el backend.

**Datos de entrada**: `Empleado`  
- `empleado`: El empleado a ser actualizado.

**Datos de salida**: `Observable<any>`  
- Respuesta del backend.

`deleteEmpleado(usuario_id: string)`

**Descripción**: Elimina un empleado del backend usando su ID.

**Datos de entrada**: `string`  
- `usuario_id`: ID del empleado a ser eliminado.

**Datos de salida**: `Observable<any>`  
- Respuesta del backend.

**Dependencias**

- `HttpClient`: Para realizar peticiones HTTP.
- `Empleado`: Modelo de datos de empleado.
- `map`: Operador de RxJS para transformar los datos de las observables.

### 4.AutenticacionService

**Descripción**
`AutenticacionService` gestiona la autenticación del usuario y el almacenamiento del token de autenticación.

**Métodos**

`login(nombre_de_usuario: string, contraseña: string)`

**Descripción**: Realiza una petición POST para autenticar al usuario.

**Datos de entrada**: 
- `nombre_de_usuario`: Nombre de usuario para la autenticación.
- `contraseña`: Contraseña para la autenticación.

**Datos de salida**: `Observable<any>`  
- Respuesta del backend con la autenticación.

`logout()`

**Descripción**: Elimina el token de autenticación y redirige al usuario al home.

**Datos de entrada**: Ninguno

**Datos de salida**: Ninguno

`isAuthenticated()`

**Descripción**: Verifica si el usuario está autenticado comprobando la existencia del token en el almacenamiento local.

**Datos de entrada**: Ninguno

**Datos de salida**: `boolean`  
- `true`: Si hay un token en el almacenamiento local.
- `false`: Si no hay un token en el almacenamiento local.

**Dependencias**

- `HttpClient`: Para realizar peticiones HTTP.
- `Router`: Para redirigir al usuario.

### 5. Componente: `admin.component.ts`

**Descripción**
Este componente gestiona la vista y funcionalidades del panel de administración. Asegura que el usuario esté autenticado al cargar y permite realizar el logout.

**Datos de Entrada**
- Ninguno

**Datos de Salida**
- Ninguno

**Métodos**

`ngOnInit()`
- **Descripción**: Verifica si el usuario está autenticado. Redirige al login si no lo está.
- **Datos de Entrada**: Ninguno
- **Datos de Salida**: Ninguno

`onLogout()`
- **Descripción**: Maneja el proceso de logout del usuario y redirige al login.
- **Datos de Entrada**: Ninguno
- **Datos de Salida**: Redirige a la página de login

---

### 6.Componente: `contactanos.component.ts`

**Descripción**
Este componente proporciona una vista de contacto y permite navegar a la página de inicio.

**Datos de Entrada**
- Ninguno

**Datos de Salida**
- Ninguno

**Métodos**

`goToHome()`
- **Descripción**: Navega a la página de inicio.
- **Datos de Entrada**: Ninguno
- **Datos de Salida**: Redirige a la ruta raíz (`/`)

---

### 7. Componente: `empleados.component.ts`

**Descripción**
Este componente maneja la vista de la lista de empleados, así como la edición, eliminación y adición de empleados.

**Datos de Entrada**
- Ninguno

**Datos de Salida**
- Ninguno

**Métodos**

`ngOnInit()`
- **Descripción**: Carga la lista de empleados al inicializar el componente.
- **Datos de Entrada**: Ninguno
- **Datos de Salida**: Ninguno

`getEmpleados()`
- **Descripción**: Obtiene la lista de empleados desde el backend y formatea la fecha de nacimiento.
- **Datos de Entrada**: Ninguno
- **Datos de Salida**: Lista de empleados con fechas formateadas

`saveEmpleado()`
- **Descripción**: Guarda un nuevo empleado o actualiza uno existente.
- **Datos de Entrada**: `selectedEmpleado`
- **Datos de Salida**: Mensajes de éxito o error en la consola

`editarEmpleado(empleado: Empleado)`
- **Descripción**: Prepara un empleado para edición.
- **Datos de Entrada**: `empleado` (Empleado a editar)
- **Datos de Salida**: Actualiza `selectedEmpleado` y activa el modo edición

`eliminarEmpleado(usuario_id: string)`
- **Descripción**: Elimina un empleado por su ID.
- **Datos de Entrada**: `usuario_id` (ID del empleado a eliminar)
- **Datos de Salida**: Mensajes de éxito o error en la consola

`resetForm(form?: any)`
- **Descripción**: Limpia el formulario y restablece el estado inicial.
- **Datos de Entrada**: `form` (opcional, formulario a resetear)
- **Datos de Salida**: Restablece `selectedEmpleado` y desactiva el modo edición

`goToHome()`
- **Descripción**: Navega a la página de administración.
- **Datos de Entrada**: Ninguno
- **Datos de Salida**: Redirige a la página de administración

---

### 8. Componente: `footer.component.ts`

**Descripción**
Este componente define el pie de página de la aplicación. Actualmente no contiene lógica ni propiedades adicionales.

**Datos de Entrada**
- Ninguno

**Datos de Salida**
- Ninguno

---

### 9. Componente: `header.component.ts`

**Descripción**
Este componente define el encabezado de la aplicación. Actualmente no contiene lógica ni propiedades adicionales.

**Datos de Entrada**
- Ninguno

**Datos de Salida**
- Ninguno

---

### 10. Componente: `header-auth.component.ts`

**Descripción**
Este componente gestiona el encabezado cuando el usuario está autenticado, mostrando el nombre de usuario y permitiendo el logout.

**Datos de Entrada**
- Ninguno

**Datos de Salida**
- Ninguno

**Métodos**

`ngOnInit()`
- **Descripción**: Recupera el nombre de usuario desde localStorage.
- **Datos de Entrada**: Ninguno
- **Datos de Salida**: Asigna el nombre de usuario a la variable `username`

`onLogout()`
- **Descripción**: Maneja el proceso de logout del usuario y redirige a la página principal.
- **Datos de Entrada**: Ninguno
- **Datos de Salida**: Redirige a la página principal (`/`)

---

### 11. Componente: `home.component.ts`

**Descripción**
Este componente define la página principal de la aplicación y permite navegar a la ruta raíz.

**Datos de Entrada**
- Ninguno

**Datos de Salida**
- Ninguno

Métodos

`navigateToAnotherPage()`
- **Descripción**: Navega a la ruta raíz.
- **Datos de Entrada**: Ninguno
- **Datos de Salida**: Redirige a la ruta raíz (`/`)

---

### 12. Componente: `login.component.ts`

**Descripción**
Este componente maneja el inicio de sesión del usuario, incluyendo la autenticación y redirección según el resultado.

**Datos de Entrada**
- **`username`**: Nombre de usuario ingresado.
- **`password`**: Contraseña ingresada.

**Datos de Salida**
- **`errorMessage`**: Mensaje de error en caso de fallar el inicio de sesión.

**Métodos**

`onLogin()`
- **Descripción**: Maneja el proceso de login, almacenando el token de autenticación y redirigiendo al usuario si la autenticación es exitosa.
- **Datos de Entrada**: `username`, `password`
- **Datos de Salida**: Redirige a la página de administración o muestra mensaje de error

---

### 13. Componente: `nosotros.component.ts`

**Descripción**
Este componente proporciona una vista de la sección "Nosotros" y permite navegar a la página de inicio.

**Datos de Entrada**
- Ninguno

**Datos de Salida**
- **Ninguno

**Métodos**

`goToHome()`
- **Descripción**: Navega a la ruta raíz (home).
- **Datos de Entrada**: Ninguno
- **Datos de Salida**: Redirige a la ruta raíz (`/`)

---

### 14. Componente: `registro.component.ts`

**Descripción**
Este componente maneja el registro de un nuevo administrador, verificando si ya existe uno y permitiendo la limpieza del formulario.

**Datos de Entrada**
- **`selectedEmpleado`**: Datos del empleado a registrar.

**Datos de Salida**
- **`adminRegistered`**: Bandera que indica si ya existe un administrador registrado.

**Métodos**

`ngOnInit()`
- **Descripción**: Verifica si ya existe un administrador registrado al inicializar el componente.
- **Datos de Entrada**: Ninguno
- **Datos de Salida**: Redirige al login si ya existe un administrador

`checkIfAdminExists()`
- **Descripción**: Comprueba si ya existe un administrador registrado.
- **Datos de Entrada**: Ninguno
- **Datos de Salida**: Actualiza la bandera `adminRegistered` y redirige si es necesario

`registerAdmin()`
- **Descripción**: Registra un nuevo administrador.
- **Datos de Entrada**: `selectedEmpleado`
- **Datos de Salida**: Redirige al login tras el registro

`resetForm(empleadoForm: any)`
- **Descripción**: Limpia el formulario de registro.
- **Datos de Entrada**: `empleadoForm` (formulario a resetear)
- **Datos de Salida**: Restablece el modelo `selectedEmpleado`

`goToHome()`
- **Descripción**: Redirige a la página de inicio.
- **Datos de Entrada**: Ninguno
- **Datos de Salida**: Redirige a la página de inicio

---

### 15. Componente: `sidebar.component.ts`

**Descripción**
Este componente define la barra lateral de la aplicación. Actualmente no contiene lógica ni propiedades adicionales.

**Datos de Entrada**
- **Ninguno**

**Datos de Salida**
- **Ninguno**

---

### 16. Componente: `sidebar-admin.component.ts`

**Descripción**
Este componente define la barra lateral para el panel de administración. Actualmente no contiene lógica ni propiedades adicionales.

**Datos de Entrada**
- **Ninguno**

**Datos de Salida**
- **Ninguno**
