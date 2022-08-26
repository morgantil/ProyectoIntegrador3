import { HttpClient, HttpRequest } from '@angular/common/http';
import { noUndefined } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Profesor } from 'src/app/Interfaces/ProfesorInterface';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.scss']
})
export class ProfesoresComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'dni','curso','eliminar','editar'];
  formProfesor:FormGroup;
  listaProfesores= new MatTableDataSource<Profesor>();


  constructor(private fb:FormBuilder, private http:HttpClient) { }

  ngOnInit(): void {
    this.crearFormulario();

    this.http.get<Profesor[]>('assets/JsonDatosProfesores.json').subscribe (data =>{
      console.log(data);
      this.listaProfesores.data=data;
    })

  }

  crearFormulario(){
    this.formProfesor = this.fb.group({
      nombre  : ['', [ Validators.required, Validators.minLength(5) ]  ],
      apellido  : ['', [ Validators.required, Validators.minLength(5) ]  ],
      dni  : ['', [ Validators.required,Validators.maxLength(8),Validators.pattern("^[0-9]*$")]],
      curso  : ['', [ Validators.required, Validators.minLength(5) ]  ]
  });

}

get nombreNoValido(){
  return this.formProfesor.get('nombre').invalid && this.formProfesor.get('nombre').touched;
}

get apellidoNoValido(){
  return this.formProfesor.get('apellido').invalid && this.formProfesor.get('apellido').touched;
}

get dniNoValido(){
  return this.formProfesor.get('dni').invalid && this.formProfesor.get('dni').touched;
}

get cursoNoValido(){
  return this.formProfesor.get('curso').invalid && this.formProfesor.get('curso').touched;
}

agregarProfesor(){
  
  let editar = false;
  let profesor= new Profesor();

  let listaAuxiliar = this.listaProfesores.data;
  

  profesor.nombre=this.formProfesor.get('nombre').value;
  profesor.apellido=this.formProfesor.get('apellido').value;
  profesor.dni=this.formProfesor.get('dni').value;
  profesor.curso=this.formProfesor.get('curso').value;


 for (const element of listaAuxiliar) {
   if(element.dni == profesor.dni){
    element.nombre = profesor.nombre;
    element.apellido = profesor.apellido;
    element.dni= profesor.dni;
    element.curso= profesor.curso;
    editar=true;
   }
 }
if(editar==false){
  listaAuxiliar.push(profesor);
}
  this.listaProfesores.data = listaAuxiliar;
this.formProfesor.reset();
}


eliminarProfesor(element){
  let listaAuxiliar2=this.listaProfesores.data;
  let lis = listaAuxiliar2.filter(data => data.dni != element.dni );
  this.listaProfesores.data=lis;
}

editarProfesor(element){
  this.formProfesor.setValue(element);
}

}
