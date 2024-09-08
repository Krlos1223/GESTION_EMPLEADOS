import { Component, OnInit } from '@angular/core';  // Importa la clase Component y OnInit para definir un componente y su ciclo de vida.
import { Router } from '@angular/router';  // Importa Router para manejar la navegación en la aplicación.
import { AutenticacionService } from '../../services/autenticacion.service';  // Importa el servicio de autenticación para manejar la lógica de login y logout.

@Component({
  selector: 'app-header-auth',  // Define el nombre del selector del componente, que se usará para incluir el componente en las plantillas HTML.
  templateUrl: './header-auth.component.html',  // Especifica el archivo HTML que define la estructura del componente.
  styleUrls: ['./header-auth.component.css']  // Especifica el archivo CSS que define los estilos del componente.
})
export class HeaderAuthComponent implements OnInit {
  username: string = '';  // Variable para almacenar el nombre de usuario.

  constructor(private autenticacionService: AutenticacionService, private router: Router) {}

  ngOnInit(): void {
    // Recupera el nombre de usuario desde localStorage
    this.username = localStorage.getItem('nombre') || '';  // Intenta obtener el nombre de usuario del localStorage; si no existe, se asigna una cadena vacía.
    console.log('Nombre de usuario:', this.username); // Muestra el nombre de usuario en la consola para verificar.
  }

  onLogout(): void {
    this.autenticacionService.logout();  // Llama al método de logout del servicio de autenticación.
    localStorage.removeItem('token');  // Elimina el token de autenticación del localStorage.
    localStorage.removeItem('nombre');  // Elimina el nombre de usuario del localStorage.
    this.router.navigate(['/']);  // Redirige al usuario a la página principal (home) después de hacer logout.
  }
}


