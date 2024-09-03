import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nosotros',  
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.css'
})
export class NosotrosComponent {

  constructor(private router: Router){}

  goToHome(): void {
    this.router.navigate(['/']); // Asegúrate de que la ruta sea correcta
  }

}
