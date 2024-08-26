import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../models/empleado';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  empleados: Empleado[] = [];
  selectedEmpleado: Empleado = new Empleado();
  editMode: boolean = false;

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.getEmpleados();
  }

  getEmpleados(): void {
    this.empleadoService.getEmpleados().subscribe(
      (data: Empleado[]) => {
        this.empleados = data;
      },
      (error) => {
        console.error('Error fetching empleados:', error);
      }
    );
  }

  saveEmpleado(): void {
    // Elimina el campo usuario_id del objeto antes de enviarlo
    const { usuario_id, ...empleadoData } = this.selectedEmpleado;

    console.log('Datos del empleado a guardar:', this.selectedEmpleado);

    if (this.editMode) {
        this.empleadoService.putEmpleado(this.selectedEmpleado).subscribe(
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
    this.selectedEmpleado = { ...empleado };
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
}
