import { Injectable } from '@angular/core'; // Importa el decorador Injectable para el servicio
import { HttpClient } from '@angular/common/http'; // Importa HttpClient para hacer peticiones HTTP
import { Empleado } from '../models/empleado'; // Importa el modelo Empleado
import { map } from 'rxjs/operators'; // Importa el operador 'map' para transformar los datos de las observables

@Injectable({
  providedIn: 'root' // Declara que el servicio está disponible en toda la aplicación
})
export class EmpleadoService {

  selectedEmpleado: Empleado; // Empleado actualmente seleccionado para operaciones (por ejemplo, editar)
  empleados: Empleado[]; // Lista de todos los empleados
  readonly URL_API = 'http://localhost:3000/api/empleados'; // URL base para la API de empleados

  constructor(private http: HttpClient) {
    this.selectedEmpleado = new Empleado(); // Inicializa un nuevo objeto Empleado vacío
    this.empleados = []; // Inicializa el array de empleados vacío
  }

  // Transforma el objeto Empleado al formato requerido por el backend
  private mapEmpleadoToBackend(empleado: Empleado): any {
    return {
      ...empleado,
      contraseña: empleado.contrasena // Renombra 'contrasena' a 'contraseña' para el backend
    };
  }

  // Transforma los datos recibidos del backend al formato Empleado
  private mapBackendToEmpleado(data: any): Empleado {
    return {
      ...data,
      contrasena: data.contraseña // Renombra 'contraseña' a 'contrasena' para el frontend
    };
  }

  // Obtiene todos los empleados y aplica la transformación de datos
  getEmpleados() {
    return this.http.get<Empleado[]>(this.URL_API).pipe(
      map((data: any[]) => data.map(this.mapBackendToEmpleado)) // Mapea cada empleado del backend al formato de Empleado
    );
  }

  // Envía un nuevo empleado al backend
  postEmpleado(empleado: Empleado) {
    const body = this.mapEmpleadoToBackend(empleado); // Mapea los datos al formato del backend
    return this.http.post(this.URL_API, body); // Realiza la petición POST para crear el empleado
  }

  // Actualiza un empleado existente en el backend
  putEmpleado(empleado: Empleado) {
    const body = this.mapEmpleadoToBackend(empleado); // Mapea los datos al formato del backend
    return this.http.put(`${this.URL_API}/${empleado.usuario_id}`, body); // Realiza la petición PUT para actualizar el empleado
  }

  // Elimina un empleado del backend usando su ID
  deleteEmpleado(usuario_id: string) {
    return this.http.delete(`${this.URL_API}/${usuario_id}`); // Realiza la petición DELETE para eliminar el empleado
  }
}
