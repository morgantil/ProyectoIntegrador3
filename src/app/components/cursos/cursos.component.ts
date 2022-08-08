import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Curso } from 'src/app/Interfaces/CursoInterface copy';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'cantHoras', 'alumnos','dia','hora','eliminar','editar'];
  formCurso:FormGroup;
  listaCursos= new MatTableDataSource<Curso>();

  constructor(private fb:FormBuilder, private http:HttpClient) { }

  ngOnInit(): void {
    this.crearFormulario();

    this.http.get<Curso[]>('assets/JsonDatosCursos.json').subscribe (data =>{
      console.log(data);
      this.listaCursos.data=data;
    })

  }

  crearFormulario(){
    this.formCurso = this.fb.group({
      nombre  : ['', [ Validators.required, Validators.minLength(5) ]  ],
      cantHoras  : ['', [ Validators.required, Validators.minLength(1) ]  ],
      alumnos  : ['', [ Validators.required,Validators.maxLength(3),]],
      dia  : ['', [ Validators.required, ]  ],
      hora  : ['', [ Validators.required, ]  ]
  });

}

get nombreNoValido(){
  return this.formCurso.get('nombre').invalid && this.formCurso.get('nombre').touched;
}

get cantHorasNoValido(){
  return this.formCurso.get('cantHoras').invalid && this.formCurso.get('cantHoras').touched;
}

get alumnosNoValido(){
  return this.formCurso.get('alumnos').invalid && this.formCurso.get('alumnos').touched;
}

get diaNoValido(){
  return this.formCurso.get('dia').invalid && this.formCurso.get('dia').touched;
}
get horaNoValido(){
  return this.formCurso.get('hora').invalid && this.formCurso.get('hora').touched;
}

agregarCurso(){
  
  let editar = false;
  let curso= new Curso();

  let listaAuxiliar = this.listaCursos.data;
  

  curso.nombre=this.formCurso.get('nombre').value;
  curso.cantHoras=this.formCurso.get('cantHoras').value;
  curso.alumnos=this.formCurso.get('alumnos').value;
  curso.dia=this.formCurso.get('dia').value;
  curso.hora=this.formCurso.get('hora').value;


 for (const element of listaAuxiliar) {
   if(element.nombre == curso.nombre){
    element.cantHoras = curso.cantHoras;
    element.alumnos = curso.alumnos;
    element.dia= curso.dia;
    element.hora= curso.hora;
    editar=true;
   }
 }
if(editar==false){
  listaAuxiliar.push(curso);
}
  this.listaCursos.data = listaAuxiliar;
this.formCurso.reset();
}


eliminarCurso(element){
  let listaAuxiliar2=this.listaCursos.data;
  let lis = listaAuxiliar2.filter(data => data.nombre != element.nombre );
  this.listaCursos.data=lis;
}

editarCurso(element){
  this.formCurso.setValue(element);
}

}






