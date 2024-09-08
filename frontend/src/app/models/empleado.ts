export class Empleado {
  usuario_id?: string; // Identificador único del usuario, opcional si se usa en el backend
  nombre: string; // Nombre del empleado
  apellido: string; // Apellido del empleado
  cedula: string; // Cédula o número de identificación del empleado
  fecha_de_nacimiento: string; // Fecha de nacimiento en formato de cadena
  rol: string; // Rol del empleado dentro de la empresa
  nombre_de_usuario: string; // Nombre de usuario para el inicio de sesión
  contrasena?: string; // Contraseña del empleado, opcional si no se usa en algunos casos

  constructor() {
      this.nombre = ''; // Inicializa el nombre como una cadena vacía
      this.apellido = ''; // Inicializa el apellido como una cadena vacía
      this.cedula = ''; // Inicializa la cédula como una cadena vacía
      this.fecha_de_nacimiento = ''; // Inicializa la fecha de nacimiento como una cadena vacía
      this.rol = ''; // Inicializa el rol como una cadena vacía
      this.nombre_de_usuario = ''; // Inicializa el nombre de usuario como una cadena vacía
      this.contrasena = ''; // Inicializa la contraseña como una cadena vacía
  }
}

