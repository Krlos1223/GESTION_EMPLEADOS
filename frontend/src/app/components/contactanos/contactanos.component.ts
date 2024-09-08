import { Component } from '@angular/core'; // Estamos trayendo una parte de Angular para crear un "componente", que es como un bloque o pieza de una página web.
import { Router } from '@angular/router'; // Aquí estamos trayendo otra parte de Angular que nos ayuda a movernos entre páginas dentro de la aplicación.

@Component({
  selector: 'app-contactanos',  // Este es el nombre que vamos a usar para colocar este componente en una página.
  templateUrl: './contactanos.component.html', // Esta es la parte del archivo que dice cómo se verá el componente (el diseño y estructura).
  styleUrl: './contactanos.component.css' // Aquí está el estilo del componente (los colores, tamaños, etc.).
})
export class ContactanosComponent {

  constructor(private router: Router){}  // El constructor se usa para preparar todo lo necesario cuando este componente se crea. En este caso, estamos preparando la "navegación" entre páginas.

  goToHome(): void {  // Esta es una función que te lleva a la página de inicio cuando la llamamos.
    this.router.navigate(['/']);  // Aquí estamos diciendo que queremos ir a la página principal (la dirección '/').
  }

}
