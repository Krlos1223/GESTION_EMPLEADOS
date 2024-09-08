import { Injectable } from '@angular/core'; // Importa el decorador Injectable desde Angular core
import { CanActivate, Router } from '@angular/router'; // Importa CanActivate y Router desde Angular router
import { AutenticacionService } from '../app/services/autenticacion.service'; // Importa el servicio de autenticación

@Injectable({
  providedIn: 'root' // Indica que este servicio debe ser proporcionado en la raíz de la aplicación
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AutenticacionService, private router: Router) { }

  canActivate(): boolean {
    // Verifica si el usuario está autenticado
    if (this.authService.isAuthenticated()) {
      return true; // Permite el acceso si está autenticado
    } else {
      // Redirige a la página de login si no está autenticado
      this.router.navigate(['/login']); 
      return false; // Deniega el acceso
    }
  }
}