import { Component } from '@angular/core';
import { AutenticacionService } from '../../services/autenticacion.service';

@Component({
  selector: 'app-admin',  
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  constructor(private autenticacionService: AutenticacionService) { }

  onLogout(): void {
    this.autenticacionService.logout();  // Llama al método de logout del servicio
  }

}
