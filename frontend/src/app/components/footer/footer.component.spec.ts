import { ComponentFixture, TestBed } from '@angular/core/testing';  // Importa herramientas para realizar pruebas en Angular.

import { FooterComponent } from './footer.component';  // Importa el componente que queremos probar.

describe('FooterComponent', () => {  // Define una suite de pruebas para el componente FooterComponent.
  let component: FooterComponent;  // Variable para almacenar la instancia del componente.
  let fixture: ComponentFixture<FooterComponent>;  // Variable para almacenar una versión de prueba del componente.

  beforeEach(async () => {  // Esta función se ejecuta antes de cada prueba para configurar el entorno de prueba.
    await TestBed.configureTestingModule({  // Configura el módulo de prueba.
      imports: [FooterComponent]  // Incluye el componente FooterComponent en el módulo de prueba.
    })
    .compileComponents();  // Compila el componente para prepararlo para la prueba.

    fixture = TestBed.createComponent(FooterComponent);  // Crea una instancia de prueba del componente FooterComponent.
    component = fixture.componentInstance;  // Asigna la instancia del componente a la variable "component".
    fixture.detectChanges();  // Aplica los cambios al componente, como si estuviera en una página real.
  });

  it('should create', () => {  // Define una prueba específica.
    expect(component).toBeTruthy();  // Verifica que el componente ha sido creado correctamente.
  });
});
