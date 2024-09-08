import { Injectable } from '@angular/core'; // Importa el decorador Injectable para el servicio
import { HttpClient } from '@angular/common/http'; // Importa HttpClient para realizar peticiones HTTP
import { Observable } from 'rxjs'; // Importa Observable para manejar los datos asincrónicos
import { Router } from '@angular/router'; // Importa Router para la navegación

@Injectable({
  providedIn: 'root' // Declara que el servicio está disponible en toda la aplicación
})
export class AutenticacionService {

  private apiUrl = 'http://localhost:3000/api/empleados/login';  // URL de la API para el login

  constructor(private http: HttpClient, private router: Router) { }

  // Realiza una petición POST para autenticar al usuario
  login(nombre_de_usuario: string, contraseña: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { nombre_de_usuario, contraseña }); // Envía las credenciales al backend
  }  
  
  // Elimina el token de autenticación y redirige al usuario al home
  logout(): void {
    localStorage.removeItem('token'); // Elimina el token del almacenamiento local
    this.router.navigate(['/']);  // Redirige al home después de cerrar sesión
  }

  // Verifica si el usuario está autenticado comprobando la existencia del token
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Devuelve true si hay un token en el almacenamiento local
  }

}

