import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {}

  // Método para verificar si la ruta actual es alguna de las rutas donde se requiere el header sin botón de "Salir"
  isPublicPage(): boolean {
    const publicRoutes = ['/', '/login', '/registro']; // Agrega aquí todas las rutas que no necesitan el botón de "Salir"
    return publicRoutes.includes(this.router.url);
  }
}


