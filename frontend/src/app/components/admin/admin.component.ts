import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private autenticacionService: AutenticacionService, private router: Router) { }

  ngOnInit(): void {
    if (!this.autenticacionService.isAuthenticated()) {
      this.router.navigate(['/login']); // Redirige al login si no está autenticado
    }
  }

  onLogout(): void {
    this.autenticacionService.logout();  // Llama al método de logout del servicio
    this.router.navigate(['/login']); // Redirige al login después de hacer logout
  }
}

