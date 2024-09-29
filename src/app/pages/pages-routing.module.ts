import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RecuperarComponent } from './recuperar/recuperar.component';
import { DocenteComponent } from './docente/docente.component';
import { AlumnoComponent } from './alumno/alumno.component';
import { AsigDocenteComponent } from './asig-docente/asig-docente.component';
import { AsigAlumnoComponent } from './asig-alumno/asig-alumno.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'recuperar-contraseña', component: RecuperarComponent },
  { path: 'docente', component: DocenteComponent },
  { path: 'alumno', component: AlumnoComponent },
  { path: 'detalle-asignatura-docente', component: AsigDocenteComponent },
  { path: 'detalle-asignatura-alumno', component: AsigAlumnoComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
