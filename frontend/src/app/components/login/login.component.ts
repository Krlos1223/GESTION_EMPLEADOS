import { Component } from '@angular/core';  // Importa la clase Component desde Angular para definir un componente.
import { Router } from '@angular/router';  // Importa Router para manejar la navegación en la aplicación.
import { AutenticacionService } from '../../services/autenticacion.service';  // Importa el servicio de autenticación para manejar el login.

@Component({
  selector: 'app-login',  // Define el nombre del selector del componente, que se usará para incluir el componente en las plantillas HTML.
  templateUrl: './login.component.html',  // Especifica el archivo HTML que define la estructura del componente.
  styleUrls: ['./login.component.css']  // Especifica el archivo CSS que define los estilos del componente.
})
export class LoginComponent {
  username: string = '';  // Variable para almacenar el nombre de usuario ingresado.
  password: string = '';  // Variable para almacenar la contraseña ingresada.
  errorMessage: string = '';  // Variable para almacenar y mostrar mensajes de error.

  constructor(private autenticacionService: AutenticacionService, private router: Router) { }  // Inyecta el servicio de autenticación y el Router.

  onLogin(): void {
    // Llama al método login del servicio de autenticación con el nombre de usuario y la contraseña ingresados.
    this.autenticacionService.login(this.username, this.password).subscribe(
      response => {
        console.log('Respuesta del backend:', response);  // Muestra la respuesta del backend en la consola para depuración.
        if (response.message === 'Autenticación satisfactoria') {  // Verifica si la autenticación fue exitosa.
          localStorage.setItem('token', response.token);  // Guarda el token de autenticación en localStorage.
          localStorage.setItem('nombre', response.nombre);  // Guarda el nombre del usuario en localStorage.
          this.router.navigate(['/admin']);  // Redirige al usuario a la página de administración.
        } else {
          this.errorMessage = response.message || 'Error desconocido';  // Muestra el mensaje de error del backend o un mensaje por defecto.
        }
      },
      error => {
        console.error('Error en el inicio de sesión', error);  // Muestra el error en la consola para depuración.
        this.errorMessage = error.error?.message || 'Error al intentar iniciar sesión. Por favor, intente de nuevo.';  // Muestra un mensaje de error si ocurre un problema con el inicio de sesión.
      }
    );
  }

  goToHome(): void {
    this.router.navigate(['/']);  // Redirige al usuario a la página principal (home).
  }
}






