import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginComponent } from './login/login.component';
import { RecuperarComponent } from './recuperar/recuperar.component';
import { DocenteComponent } from './docente/docente.component';
import { AlumnoComponent } from './alumno/alumno.component';
import { AsigDocenteComponent } from './asig-docente/asig-docente.component';
import { AsigAlumnoComponent } from './asig-alumno/asig-alumno.component';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent,
    RecuperarComponent,
    DocenteComponent,
    AlumnoComponent,
    AsigDocenteComponent,
    AsigAlumnoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagesRoutingModule,
    SharedModule, // Importar el módulo SharedModule para reutilizar componentes comunes en todos los módulos
  ]
})
export class PagesModule { }
