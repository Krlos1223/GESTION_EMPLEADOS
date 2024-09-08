import { Component } from '@angular/core';  // Importa la clase Component desde Angular para definir un componente.
import { Router } from '@angular/router';  // Importa Router para manejar la navegación en la aplicación.

@Component({
  selector: 'app-home',  // Define el nombre del selector del componente, que se usará para incluir el componente en las plantillas HTML.
  templateUrl: './home.component.html',  // Especifica el archivo HTML que define la estructura del componente.
  styleUrls: ['./home.component.css']  // Especifica el archivo CSS que define los estilos del componente.
})
export class HomeComponent {
  constructor(private router: Router) {}  // Inyecta el servicio Router para manejar la navegación.

  navigateToAnotherPage(): void {
    this.router.navigate(['/']);  // Navega a la ruta raíz (home) cuando se llama a este método.
  }
}



