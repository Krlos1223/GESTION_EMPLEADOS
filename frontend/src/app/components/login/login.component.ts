import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  onSubmit(): void {
    console.log('Nombre de Usuario:', this.username);
    console.log('Contraseña:', this.password);
    // Agrega aquí la lógica para manejar el inicio de sesión
  }
}

