import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nosotros',  // Define el nombre del selector para este componente.
  templateUrl: './nosotros.component.html',  // Ubicación del archivo de plantilla HTML.
  styleUrls: ['./nosotros.component.css']  // Ubicación del archivo de estilos CSS.
})
export class NosotrosComponent {

  constructor(private router: Router){}  // Inyecta el servicio Router para manejar la navegación.

  goToHome(): void {
    this.router.navigate(['/']); // Navega a la ruta raíz (home) cuando se llama a este método.
  }

}

