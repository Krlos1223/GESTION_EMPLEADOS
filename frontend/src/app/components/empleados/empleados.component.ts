import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../models/empleado';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  empleados: Empleado[] = [];
  selectedEmpleado: Empleado = new Empleado();
  editMode: boolean = false;

  constructor(private empleadoService: EmpleadoService, private router: Router) {}

  ngOnInit(): void {
    this.getEmpleados();
  }

  getEmpleados(): void {
    this.empleadoService.getEmpleados().subscribe(
        (data: Empleado[]) => {
            console.log('Datos recibidos desde el backend:', data);
            this.empleados = data.map(empleado => {
                // Formatear la fecha de nacimiento para el formato YYYY-MM-DD
                const formattedDate = new Date(empleado.fecha_de_nacimiento).toISOString().split('T')[0];
                return {
                    ...empleado,
                    fecha_de_nacimiento: formattedDate // Ajusta al formato YYYY-MM-DD
                };
            });
        },
        (error) => {
            console.error('Error fetching empleados:', error);
        }
    );
}

  saveEmpleado(): void {
    const { usuario_id, contrasena, ...empleadoData } = this.selectedEmpleado;

    // Construye el objeto que se enviará
    const dataToSend = {
      ...empleadoData,
      ...(this.editMode && contrasena ? { contrasena } : {}) // Incluye contrasena solo si está presente en modo edición
    };

    console.log('Datos del empleado a guardar:', dataToSend);

    if (this.editMode && usuario_id) {
      // Si estás editando y hay un usuario_id válido, envía los datos junto con el usuario_id
      this.empleadoService.putEmpleado({ ...dataToSend, usuario_id }).subscribe(
        (response) => {
          console.log('Empleado updated successfully');
          this.getEmpleados();
          this.resetForm();
        },
        (error) => {
          console.error('Error updating empleado:', error);
        }
      );
    } else {
      // Para nuevos empleados, solo envía los datos completos
      this.empleadoService.postEmpleado(this.selectedEmpleado).subscribe(
        (response) => {
          console.log('Empleado added successfully');
          this.getEmpleados();
          this.resetForm();
        },
        (error) => {
          console.error('Error adding empleado:', error);
        }
      );
    }
  }

  

  editarEmpleado(empleado: Empleado): void {
    this.selectedEmpleado = { ...empleado, contrasena: '' }; // Limpia la contraseña al editar
    this.editMode = true;
  }

  eliminarEmpleado(usuario_id: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar este empleado?')) {
      this.empleadoService.deleteEmpleado(usuario_id).subscribe(
        (response) => {
          console.log('Empleado deleted successfully');
          this.getEmpleados();
        },
        (error) => {
          console.error('Error deleting empleado:', error);
        }
      );
    }
  }

  resetForm(form?: any): void {
    this.selectedEmpleado = new Empleado();
    this.editMode = false;
    if (form) {
      form.reset();
    }
  }

  goToHome(): void {
    this.router.navigate(['/admin']); // Asegúrate de que la ruta sea correcta
  }

}
