// sidebar.component.ts
import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../../services/autenticacion.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userRole: string = '';

  constructor(private autenticacionService: AutenticacionService) {}

  ngOnInit(): void {
    this.userRole = this.autenticacionService.getUserRole(); // Obtener el rol del usuario
  }
}

