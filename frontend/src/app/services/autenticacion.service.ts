import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private apiUrl = 'http://localhost:3000/api/empleados/login';  // Cambia esta URL si es necesario

  constructor(private http: HttpClient, private router: Router) { }

  login(nombre_de_usuario: string, contraseña: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { nombre_de_usuario, contraseña });
  }  
  
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']);  // Redirige al home después del logout
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

}
