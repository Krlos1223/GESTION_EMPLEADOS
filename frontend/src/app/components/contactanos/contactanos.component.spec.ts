import { ComponentFixture, TestBed } from '@angular/core/testing'; // Importamos herramientas de Angular que nos ayudan a hacer pruebas automáticas del código.

import { ContactanosComponent } from './contactanos.component'; // Traemos el componente que queremos probar, en este caso, el "ContactanosComponent".

describe('ContactanosComponent', () => { // Aquí comienza el bloque donde describimos qué estamos probando. En este caso, el componente "ContactanosComponent".
  let component: ContactanosComponent;  // Declaramos una variable para almacenar el componente.
  let fixture: ComponentFixture<ContactanosComponent>;  // "fixture" es como una versión de prueba del componente, donde se puede manipular y observar.

  beforeEach(async () => {  // Esta parte se ejecuta antes de cada prueba. Aquí es donde preparamos todo lo necesario para probar.
    await TestBed.configureTestingModule({  // Configuramos un "módulo de prueba", como un espacio donde colocamos el componente y lo preparamos para probar.
      imports: [ContactanosComponent]  // Especificamos que vamos a importar y probar el componente "ContactanosComponent".
    })
    .compileComponents();  // Compilamos o armamos todo para que esté listo para las pruebas.

    fixture = TestBed.createComponent(ContactanosComponent);  // Creamos una versión de prueba del componente.
    component = fixture.componentInstance;  // Guardamos la instancia del componente en nuestra variable "component".
    fixture.detectChanges();  // Esto aplica cualquier cambio que ocurra dentro del componente antes de comenzar la prueba.
  });

  it('should create', () => {  // Esta es una prueba sencilla que verifica si el componente se creó correctamente.
    expect(component).toBeTruthy();  // Aquí estamos diciendo: "esperamos que el componente sea verdadero", es decir, que exista.
  });
});
