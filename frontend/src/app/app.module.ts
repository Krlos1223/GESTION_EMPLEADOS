import { NgModule } from '@angular/core'; // Importa el decorador NgModule desde Angular core
import { BrowserModule } from '@angular/platform-browser'; // Importa el módulo BrowserModule, necesario para aplicaciones Angular
import { FormsModule } from '@angular/forms'; // Importa FormsModule para usar formularios y ngModel
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule para realizar peticiones HTTP
import { AppRoutingModule } from './app-routing.module'; // Importa el módulo de enrutamiento de la aplicación
import { AppComponent } from './app.component'; // Importa el componente raíz de la aplicación
import { EmpleadosComponent } from './components/empleados/empleados.component'; // Importa el componente para gestionar empleados
import { HeaderComponent } from './components/header/header.component'; // Importa el componente del encabezado
import { SidebarComponent } from './components/sidebar/sidebar.component'; // Importa el componente de la barra lateral
import { HomeComponent } from './components/home/home.component'; // Importa el componente de inicio
import { FooterComponent } from './components/footer/footer.component'; // Importa el componente del pie de página
import { LoginComponent } from './components/login/login.component'; // Importa el componente de inicio de sesión
import { RegistroComponent } from './components/registro/registro.component'; // Importa el componente para el registro de administrador
import { AdminComponent } from './components/admin/admin.component'; // Importa el componente del panel de administración
import { SidebarAdminComponent } from './components/sidebar-admin/sidebar-admin.component'; // Importa el componente de la barra lateral del administrador
import { HeaderAuthComponent } from './components/header-auth/header-auth.component'; // Importa el componente del encabezado para usuarios autenticados
import { NosotrosComponent } from './components/nosotros/nosotros.component'; // Importa el componente sobre nosotros

@NgModule({
  declarations: [
    AppComponent, // Declara el componente raíz de la aplicación
    LoginComponent, // Declara el componente de inicio de sesión
    EmpleadosComponent, // Declara el componente de empleados
    HeaderComponent, // Declara el componente del encabezado general
    SidebarComponent, // Declara el componente de la barra lateral general
    HomeComponent, // Declara el componente de inicio
    FooterComponent, // Declara el componente del pie de página
    RegistroComponent, // Declara el componente para registrar un administrador
    AdminComponent, // Declara el componente del panel de administración
    SidebarAdminComponent, // Declara el componente de la barra lateral del administrador
    HeaderAuthComponent, // Declara el componente del encabezado para usuarios autenticados
    NosotrosComponent // Declara el componente sobre nosotros
  ],
  imports: [
    BrowserModule, // Importa el módulo para aplicaciones Angular que se ejecutan en el navegador
    FormsModule, // Importa el módulo para usar formularios y ngModel
    AppRoutingModule, // Importa el módulo de enrutamiento para la aplicación
    HttpClientModule // Importa el módulo para realizar peticiones HTTP
  ],
  providers: [], // Aquí puedes agregar servicios que se inyectarán en toda la aplicación
  bootstrap: [AppComponent] // Define el componente raíz para iniciar la aplicación
})
export class AppModule { }
