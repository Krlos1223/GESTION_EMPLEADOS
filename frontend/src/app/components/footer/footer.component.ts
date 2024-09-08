import { Component } from '@angular/core';  // Importa la clase Component desde Angular para definir un componente.

@Component({
  selector: 'app-footer',  // Define el nombre del selector del componente, que se usará para incluir el componente en las plantillas HTML.
  templateUrl: './footer.component.html',  // Especifica el archivo HTML que define la estructura del componente.
  styleUrls: ['./footer.component.css']  // Especifica el archivo CSS que define los estilos del componente.
})
export class FooterComponent {}  // Define la clase del componente "FooterComponent". Actualmente no tiene lógica ni propiedades adicionales.

