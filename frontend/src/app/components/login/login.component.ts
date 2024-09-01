import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = ''; // Variable para almacenar mensajes de error

  constructor(private autenticacionService: AutenticacionService, private router: Router) { }

  onLogin(): void {
    this.autenticacionService.login(this.username, this.password).subscribe(
      response => {
        console.log('Respuesta del backend:', response); // Para depurar
        if (response.message === 'Autenticación satisfactoria') {
          localStorage.setItem('token', response.token); // Asegúrate de enviar un token si es necesario
          localStorage.setItem('nombre', response.nombre);//obtener nombre de usuario
          this.router.navigate(['/admin']);
        } else {
          this.errorMessage = response.message || 'Error desconocido'; // Mostrar el mensaje de error del backend
        }
      },
      error => {
        console.error('Error en el inicio de sesión', error);
        // Asegúrate de capturar el mensaje de error correcto del backend
        this.errorMessage = error.error?.message || 'Error al intentar iniciar sesión. Por favor, intente de nuevo.';
      }
    );
  }

  goToHome(): void {
    this.router.navigate(['/']); // Asegúrate de que la ruta sea correcta
  }
  
}






