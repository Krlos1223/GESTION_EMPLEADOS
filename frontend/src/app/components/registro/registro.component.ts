import { Component, OnInit } from '@angular/core'; // Importa el decorador Component y el ciclo de vida OnInit.
import { EmpleadoService } from '../../services/empleado.service'; // Importa el servicio que maneja empleados.
import { Empleado } from '../../models/empleado'; // Importa el modelo de empleado.
import { Router } from '@angular/router'; // Importa el servicio Router para manejar la navegación.

@Component({
  selector: 'app-registro',  // Define el nombre del selector para este componente.
  templateUrl: './registro.component.html',  // Ubicación del archivo de plantilla HTML.
  styleUrls: ['./registro.component.css']  // Ubicación del archivo de estilos CSS.
})
export class RegistroComponent implements OnInit {
  selectedEmpleado: Empleado = new Empleado();  // Modelo de empleado para el registro.
  adminRegistered: boolean = false;  // Bandera para verificar si ya se ha registrado un administrador.

  constructor(private empleadoService: EmpleadoService, private router: Router) {}

  ngOnInit(): void {
    this.checkIfAdminExists();  // Verifica al iniciar si ya existe un administrador registrado.
  }

  // Verificar si ya existe un administrador registrado
  checkIfAdminExists(): void {
    this.empleadoService.getEmpleados().subscribe(
      (empleados: Empleado[]) => {
        // Comprobar si existe algún empleado con el rol de 'Administrador'
        if (empleados.some(empleado => empleado.rol === 'Administrador')) {
          this.adminRegistered = true;  // Establece la bandera si ya existe un administrador
          console.log('Administrador ya registrado, redirigiendo...');
          this.router.navigate(['/']);  // Redirige al login si ya existe un administrador
        }
      },
      (error) => {
        console.error('Error checking admin existence:', error);  // Manejo de errores al verificar la existencia
      }
    );
  }

  // Registrar un administrador
  registerAdmin(): void {
    this.selectedEmpleado.rol = 'Administrador';  // Asegura que el rol sea siempre 'Administrador'
    this.empleadoService.postEmpleado(this.selectedEmpleado).subscribe(
      (response) => {
        console.log('Administrador registrado exitosamente');  // Mensaje de éxito al registrar
        this.router.navigate(['/']);  // Redirige al login tras el registro
      },
      (error) => {
        console.error('Error al registrar el administrador:', error);  // Manejo de errores al registrar
      }
    );
  }

  // Limpiar el formulario
  resetForm(empleadoForm: any): void {
    empleadoForm.resetForm();  // Limpia el formulario
    this.selectedEmpleado = new Empleado();  // Restablece el modelo del empleado
  }

  goToHome(): void {
    this.router.navigate(['/']);  // Redirige a la página de inicio
  }

}

