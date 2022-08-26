import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosComponent } from './feature/alumnos/alumnos.component';
import { CursosComponent } from './feature/cursos/cursos.component';
import { LoginComponent } from './components/login/login.component';
import { ProfesoresComponent } from './feature/profesores/profesores.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'alumnos',component:AlumnosComponent},
  {path:'profesores',component:ProfesoresComponent},
  {path:'cursos',component:CursosComponent},
  //{path:'',component:LoginComponent,pathMatch:'full'},
  //{path:'**',redirectTo:'/',pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
