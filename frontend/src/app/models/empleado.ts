export class Empleado {
  usuario_id?: string; // Este campo puede ser opcional si se usa en el backend
  nombre: string;
  apellido: string;
  cedula: string;
  fecha_de_nacimiento: string;
  rol: string;
  nombre_de_usuario: string;
  contrasena?: string;

  constructor() {
      this.nombre = '';
      this.apellido = '';
      this.cedula = '';
      this.fecha_de_nacimiento = '';
      this.rol = '';
      this.nombre_de_usuario = '';
      this.contrasena = '';
  }
}
