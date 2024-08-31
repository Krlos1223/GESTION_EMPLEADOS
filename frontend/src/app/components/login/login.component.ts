// login.component.ts
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

  constructor(private autenticacionService: AutenticacionService, private router: Router) { }

  onLogin(): void {
    this.autenticacionService.login(this.username, this.password).subscribe(
      response => {
        if (response.message === 'Autenticación satisfactoria') {
          localStorage.setItem('token', response.token); // Asegúrate de enviar un token si es necesario
          this.router.navigate(['/home']);
        } else {
          alert('Credenciales incorrectas');
        }
      },
      error => {
        console.error('Error en el inicio de sesión', error);
      }
    );
  }
}





