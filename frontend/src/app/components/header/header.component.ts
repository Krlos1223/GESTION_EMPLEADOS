import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string = '';

  ngOnInit(): void {
    // Aquí podrías comprobar si el usuario está logueado
    // Esto es solo un ejemplo; podrías obtener el estado de autenticación desde un servicio
    const user = localStorage.getItem('user'); // Supongamos que guardas el nombre de usuario en localStorage
    if (user) {
      this.isLoggedIn = true;
      this.username = user;
    }
  }

  logout(): void {
    // Lógica para cerrar sesión
    this.isLoggedIn = false;
    localStorage.removeItem('user'); // Por ejemplo, removiendo el usuario de localStorage
    // Redirigir a la página de inicio de sesión o index
  }
}

