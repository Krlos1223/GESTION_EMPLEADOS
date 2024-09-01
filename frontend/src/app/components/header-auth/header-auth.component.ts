import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion.service';

@Component({
  selector: 'app-header-auth',
  templateUrl: './header-auth.component.html',
  styleUrls: ['./header-auth.component.css']
})
export class HeaderAuthComponent implements OnInit {
  username: string = '';

  constructor(private autenticacionService: AutenticacionService, private router: Router) {}

  ngOnInit(): void {
    // Recupera el nombre de usuario desde localStorage
    this.username = localStorage.getItem('nombre') || '';
    console.log('Nombre de usuario:', this.username); // Verifica en la consola
  }

  onLogout(): void {
    this.autenticacionService.logout();
    localStorage.removeItem('token'); // Elimina el token de autenticación
    localStorage.removeItem('nombre'); // Elimina el nombre de usuario
    this.router.navigate(['/']); // Redirigir al home después de hacer logout
  }
}


