import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { AlumnosComponent } from '../components/alumnos/alumnos.component';
import { CursosComponent } from '../components/cursos/cursos.component';
import { ProfesoresComponent } from '../components/profesores/profesores.component';

const routes:Routes=[
  {
    path:'',
    children:[
      {path:'login',component:LoginComponent},
      {path:'alumnos',component:AlumnosComponent},
      {path:'cursos',component:CursosComponent},
      {path:'profesores',component:ProfesoresComponent},
      {path:'**',redirectTo:'login'},
    ]

  }
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class AuthRoutingModule { }
