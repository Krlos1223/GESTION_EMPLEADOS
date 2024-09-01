import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AdminComponent } from './components/admin/admin.component';
import { SidebarAdminComponent } from './components/sidebar-admin/sidebar-admin.component';
import { HeaderAuthComponent } from './components/header-auth/header-auth.component'; 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmpleadosComponent,
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    FooterComponent,
    RegistroComponent,
    AdminComponent,
    SidebarAdminComponent,
    HeaderAuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }