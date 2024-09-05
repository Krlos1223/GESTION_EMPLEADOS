import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empleado } from '../models/empleado';
import { map } from 'rxjs/operators'; // Importa el operador 'map'

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  selectedEmpleado: Empleado;
  empleados : Empleado[];
  readonly URL_API = 'http://localhost:3000/api/empleados';

  constructor(private http: HttpClient) {
    this.selectedEmpleado = new Empleado();
    this.empleados = [];
  }

  private mapEmpleadoToBackend(empleado: Empleado): any {
    return {
      ...empleado,
      contraseña: empleado.contrasena // Renombramos la propiedad para el backend
    };
  }

  private mapBackendToEmpleado(data: any): Empleado {
    return {
      ...data,
      contrasena: data.contraseña // Renombramos la propiedad desde el backend
    };
  }

  getEmpleados() {
    return this.http.get<Empleado[]>(this.URL_API).pipe(
      map((data: any[]) => data.map(this.mapBackendToEmpleado))
    );
  }

  postEmpleado(empleado: Empleado) {
    const body = this.mapEmpleadoToBackend(empleado);
    return this.http.post(this.URL_API, body);
  }

  putEmpleado(empleado: Empleado) {
    const body = this.mapEmpleadoToBackend(empleado);
    return this.http.put(`${this.URL_API}/${empleado.usuario_id}`, body);
  }

  deleteEmpleado(usuario_id: string) {
    return this.http.delete(`${this.URL_API}/${usuario_id}`);
  }
}
