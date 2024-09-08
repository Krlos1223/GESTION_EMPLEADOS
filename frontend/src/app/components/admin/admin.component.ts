import { Component, OnInit } from '@angular/core'; // Importa Component y OnInit para definir el componente y su inicialización
import { Router } from '@angular/router'; // Importa Router para la navegación
import { AutenticacionService } from '../../services/autenticacion.service'; // Importa el servicio de autenticación

@Component({
  selector: 'app-admin', // Selector para usar este componente en la plantilla
  templateUrl: './admin.component.html', // Ruta al archivo de plantilla HTML
  styleUrls: ['./admin.component.css'] // Ruta al archivo de estilos CSS
})
export class AdminComponent implements OnInit {

  constructor(private autenticacionService: AutenticacionService, private router: Router) { }

  ngOnInit(): void {
    // Verifica si el usuario está autenticado al inicializar el componente
    if (!this.autenticacionService.isAuthenticated()) {
      this.router.navigate(['/login']); // Redirige al login si el usuario no está autenticado
    }
  }

  // Método para manejar el logout
  onLogout(): void {
    this.autenticacionService.logout();  // Llama al método de logout del servicio
    this.router.navigate(['/login']); // Redirige al login después de hacer logout
  }
}