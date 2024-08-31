import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private apiUrl = 'http://localhost:3000/api/empleados/login';  // Cambia esta URL si es necesario

  constructor(private http: HttpClient) { }

  login(nombre_de_usuario: string, contraseña: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { nombre_de_usuario, contraseña });
  }

   // Puedes agregar métodos adicionales si es necesario
   getUserRole(): string {
    // Implementa la lógica para obtener el rol del usuario
    // Por ejemplo, podrías obtenerlo del token almacenado en localStorage
    return 'userRole'; // Cambia esto según tu implementación
  }
}
