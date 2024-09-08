import { Component } from '@angular/core'; // Importa el decorador Component para definir un componente de Angular
import { Router } from '@angular/router'; // Importa el servicio Router para gestionar la navegación entre rutas

@Component({
  selector: 'app-root', // Define el selector para este componente, que se usa en las plantillas HTML
  templateUrl: './app.component.html', // Especifica la ruta al archivo de plantilla HTML para este componente
  styleUrls: ['./app.component.css'] // Especifica la ruta al archivo de estilos CSS para este componente
})
export class AppComponent {
  constructor(private router: Router) {} // Inyecta el servicio Router para permitir la navegación y obtener la URL actual

  // Método para verificar si la ruta actual es alguna de las rutas donde se requiere el header sin botón de "Salir"
  isPublicPage(): boolean {
    // Lista de rutas consideradas como públicas donde no se necesita el botón de "Salir"
    const publicRoutes = ['/', '/login', '/registro', `/nosotros`, '/configuracion', '/contactanos']; 
    // Verifica si la URL actual está en la lista de rutas públicas
    return publicRoutes.includes(this.router.url);
  }
}


