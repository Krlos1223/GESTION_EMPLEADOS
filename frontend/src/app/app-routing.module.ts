// Importa los módulos necesarios para la configuración de rutas
import { NgModule } from '@angular/core'; // Importa el decorador NgModule
import { RouterModule, Routes } from '@angular/router'; // Importa RouterModule y Routes para definir rutas

// Importa los componentes que se utilizarán en las rutas
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AdminComponent } from './components/admin/admin.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { ContactanosComponent } from './components/contactanos/contactanos.component';

// Importa el guard para proteger las rutas que requieren autenticación
import { AuthGuard } from './auth.guard';

// Define las rutas de la aplicación
export const routes: Routes = [  
  { path: '', component: HomeComponent },  // Ruta raíz que carga el componente HomeComponent
  { path: 'login', component: LoginComponent },  // Ruta para el componente de inicio de sesión
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },  // Ruta protegida por AuthGuard para el componente AdminComponent
  { path: 'empleados', component: EmpleadosComponent, canActivate: [AuthGuard] },  // Ruta protegida por AuthGuard para el componente EmpleadosComponent
  { path: 'registro', component: RegistroComponent },  // Ruta para el componente de registro
  { path: 'nosotros', component: NosotrosComponent },  // Ruta para el componente NosotrosComponent
  { path: 'contactanos', component: ContactanosComponent }  // Ruta para el componente ContactanosComponent
  
];

// Configura el módulo de enrutamiento
@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Configura RouterModule con las rutas definidas
  exports: [RouterModule]  // Exporta RouterModule para que esté disponible en toda la aplicación
})
export class AppRoutingModule { }

