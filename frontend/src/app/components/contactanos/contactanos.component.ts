import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contactanos',
  standalone: true,
  imports: [],
  templateUrl: './contactanos.component.html',
  styleUrl: './contactanos.component.css'
})
export class ContactanosComponent {

  constructor(private router: Router){}

  goToHome(): void {
    this.router.navigate(['/']); // Asegúrate de que la ruta sea correcta
  }

}
