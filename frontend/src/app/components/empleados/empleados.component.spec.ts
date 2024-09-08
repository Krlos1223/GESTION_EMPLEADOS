import { ComponentFixture, TestBed } from '@angular/core/testing';  // Importamos herramientas de prueba de Angular.

import { EmpleadosComponent } from './empleados.component';  // Importamos el componente "EmpleadosComponent" que queremos probar.

describe('EmpleadosComponent', () => {  // Iniciamos la suite de pruebas para el componente "EmpleadosComponent".
  let component: EmpleadosComponent;  // Creamos una variable para almacenar el componente.
  let fixture: ComponentFixture<EmpleadosComponent>;  // "fixture" es como una versión de prueba del componente que podemos usar para simular cómo se ve y cómo funciona.

  beforeEach(async () => {  // Esta función se ejecuta antes de cada prueba. Configura el entorno necesario para probar el componente.
    await TestBed.configureTestingModule({  // Creamos un módulo de prueba que nos permite cargar el componente y sus dependencias.
      imports: [EmpleadosComponent]  // Indicamos que el componente "EmpleadosComponent" es parte de este módulo.
    })
    .compileComponents();  // Compilamos el componente para que pueda ser usado en las pruebas.

    fixture = TestBed.createComponent(EmpleadosComponent);  // Creamos una instancia de prueba del componente.
    component = fixture.componentInstance;  // Asignamos la instancia del componente a la variable "component".
    fixture.detectChanges();  // Aplicamos cualquier cambio al componente, como si lo estuviéramos mostrando en una página real.
  });

  it('should create', () => {  // Esta es una prueba específica. Verificamos que el componente se cree correctamente.
    expect(component).toBeTruthy();  // Esperamos que el componente exista (que sea verdadero, "truthy").
  });
});

