import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { LoginComponent } from './components/login/login.component';
import { ProfesoresComponent } from './components/profesores/profesores.component';
import { AutoGuard } from './auto.guard';
const routes: Routes = [
  {path:'auth',
  loadChildren: () => import('./app.module').then(m=>m.AppModule),
  canActivate:[AutoGuard]
 
}
 
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
