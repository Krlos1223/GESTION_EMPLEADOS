import { Component, OnInit } from '@angular/core';  // Importamos lo necesario de Angular para hacer un componente que se inicialice al cargarse.
import { EmpleadoService } from '../../services/empleado.service';  // Importamos un servicio que maneja la comunicación con el backend sobre los empleados.
import { Empleado } from '../../models/empleado';  // Importamos un modelo para representar la estructura de un empleado.
import { Router } from '@angular/router';  // Importamos la funcionalidad para navegar entre páginas.

@Component({
  selector: 'app-empleados',  // Nombre con el que identificamos este componente en las plantillas HTML.
  templateUrl: './empleados.component.html',  // El archivo donde está el diseño visual del componente.
  styleUrls: ['./empleados.component.css']  // El archivo donde están los estilos visuales (colores, tamaños, etc.).
})
export class EmpleadosComponent implements OnInit {  // Este es el componente de la lista de empleados.

  empleados: Empleado[] = [];  // Lista vacía de empleados que se llenará más tarde.
  selectedEmpleado: Empleado = new Empleado();  // Un empleado seleccionado para editar o agregar.
  editMode: boolean = false;  // Si es verdadero, indica que estamos en modo de edición.

  constructor(private empleadoService: EmpleadoService, private router: Router) {}  // El constructor prepara el servicio de empleados y la navegación entre páginas.

  ngOnInit(): void {  // Función que se ejecuta al inicio, cuando la página carga.
    this.getEmpleados();  // Llama a la función para obtener la lista de empleados.
  }

  getEmpleados(): void {  // Función que obtiene la lista de empleados del servidor.
    this.empleadoService.getEmpleados().subscribe(
        (data: Empleado[]) => {  // Cuando se reciben los datos de los empleados, los procesamos.
            console.log('Datos recibidos desde el backend:', data);
            this.empleados = data.map(empleado => {
                // Formateamos la fecha de nacimiento en formato YYYY-MM-DD.
                const formattedDate = new Date(empleado.fecha_de_nacimiento).toISOString().split('T')[0];
                return {
                    ...empleado,
                    fecha_de_nacimiento: formattedDate  // Ajustamos la fecha de nacimiento para que se vea correctamente.
                };
            });
        },
        (error) => {
            console.error('Error fetching empleados:', error);  // Si hay un error al obtener los empleados, lo mostramos en la consola.
        }
    );
}

  saveEmpleado(): void {  // Función para guardar un empleado, sea nuevo o editado.
    const { usuario_id, contrasena, ...empleadoData } = this.selectedEmpleado;  // Tomamos los datos del empleado seleccionado, excepto su ID y contraseña.

    const dataToSend = {  // Datos que vamos a enviar al servidor.
      ...empleadoData,
      ...(this.editMode && contrasena ? { contrasena } : {})  // Solo incluimos la contraseña si estamos editando y hay una contraseña ingresada.
    };

    console.log('Datos del empleado a guardar:', dataToSend);

    if (this.editMode && usuario_id) {  // Si estamos en modo edición y el empleado tiene un ID válido, actualizamos sus datos.
      this.empleadoService.putEmpleado({ ...dataToSend, usuario_id }).subscribe(
        (response) => {
          console.log('Empleado updated successfully');  // Mensaje en consola si se actualiza con éxito.
          this.getEmpleados();  // Actualizamos la lista de empleados.
          this.resetForm();  // Limpiamos el formulario.
        },
        (error) => {
          console.error('Error updating empleado:', error);  // Mostramos error en consola si no se puede actualizar.
        }
      );
    } else {  // Si es un nuevo empleado, enviamos los datos para agregarlo.
      this.empleadoService.postEmpleado(this.selectedEmpleado).subscribe(
        (response) => {
          console.log('Empleado added successfully');  // Mensaje en consola si se agrega con éxito.
          this.getEmpleados();  // Actualizamos la lista de empleados.
          this.resetForm();  // Limpiamos el formulario.
        },
        (error) => {
          console.error('Error adding empleado:', error);  // Mostramos error en consola si no se puede agregar.
        }
      );
    }
  }

  editarEmpleado(empleado: Empleado): void {  // Función que prepara un empleado para ser editado.
    this.selectedEmpleado = { ...empleado, contrasena: '' };  // Limpiamos la contraseña por seguridad al editar.
    this.editMode = true;  // Activamos el modo edición.
  }

  eliminarEmpleado(usuario_id: string): void {  // Función para eliminar un empleado.
    if (confirm('¿Estás seguro de que quieres eliminar este empleado?')) {  // Preguntamos si está seguro antes de eliminar.
      this.empleadoService.deleteEmpleado(usuario_id).subscribe(
        (response) => {
          console.log('Empleado deleted successfully');  // Mensaje en consola si se elimina con éxito.
          this.getEmpleados();  // Actualizamos la lista de empleados.
        },
        (error) => {
          console.error('Error deleting empleado:', error);  // Mostramos error en consola si no se puede eliminar.
        }
      );
    }
  }

  resetForm(form?: any): void {  // Función que limpia el formulario y vuelve todo a su estado inicial.
    this.selectedEmpleado = new Empleado();  // Reiniciamos el empleado seleccionado.
    this.editMode = false;  // Desactivamos el modo edición.
    if (form) {
      form.reset();  // Si hay un formulario, lo reiniciamos.
    }
  }

  goToHome(): void {  // Función para navegar a la página de inicio del administrador.
    this.router.navigate(['/admin']);  // Redirige a la página de administración.
  }

}
