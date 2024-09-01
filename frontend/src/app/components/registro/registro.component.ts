import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../models/empleado';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  selectedEmpleado: Empleado = new Empleado();
  adminRegistered: boolean = false;

  constructor(private empleadoService: EmpleadoService, private router: Router) {}

  ngOnInit(): void {
    this.checkIfAdminExists();
  }

  // Verificar si ya existe un administrador registrado
  checkIfAdminExists(): void {
    this.empleadoService.getEmpleados().subscribe(
      (empleados: Empleado[]) => {
        if (empleados.some(empleado => empleado.rol === 'Administrador')) {
          this.adminRegistered = true;
          console.log('Administrador ya registrado, redirigiendo...');
          this.router.navigate(['/']); // Redirigir al login si ya existe un administrador
        }
      },
      (error) => {
        console.error('Error checking admin existence:', error);
      }
    );
  }

  // Registrar un administrador
  registerAdmin(): void {
    this.selectedEmpleado.rol = 'Administrador'; // Asegurar que el rol sea siempre 'Administrador'
    this.empleadoService.postEmpleado(this.selectedEmpleado).subscribe(
      (response) => {
        console.log('Administrador registrado exitosamente');
        this.router.navigate(['/']); // Redirigir al login tras el registro
      },
      (error) => {
        console.error('Error al registrar el administrador:', error);
      }
    );
  }

  // Limpiar el formulario
  resetForm(empleadoForm: any): void {
    empleadoForm.resetForm();
    this.selectedEmpleado = new Empleado(); // Restablecer el modelo del empleado
  }

  goToHome(): void {
    this.router.navigate(['/']); // Asegúrate de que la ruta sea correcta
  }

}
