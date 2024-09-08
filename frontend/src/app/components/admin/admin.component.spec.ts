import { ComponentFixture, TestBed } from '@angular/core/testing'; // Importa herramientas para pruebas en Angular

import { AdminComponent } from './admin.component'; // Importa el componente a probar

describe('AdminComponent', () => {
  let component: AdminComponent; // Variable para almacenar la instancia del componente
  let fixture: ComponentFixture<AdminComponent>; // Variable para manejar el fixture del componente

  beforeEach(async () => {
    // Configura el módulo de prueba
    await TestBed.configureTestingModule({
      imports: [AdminComponent] // Importa el componente a probar
    })
    .compileComponents(); // Compila los componentes del módulo de prueba

    // Crea una instancia del componente y su fixture
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance; // Asigna la instancia del componente
    fixture.detectChanges(); // Detecta cambios para actualizar el componente
  });

  // Prueba para verificar que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que el componente existe
  });
});