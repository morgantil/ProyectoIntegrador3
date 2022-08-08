import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Alumno } from 'src/app/Interfaces/AlumnoInterface';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent implements OnInit {

   
  displayedColumns: string[] = ['nombre', 'apellido', 'dni','email','nota','eliminar','editar'];

  formEstudiante:FormGroup;
  listaAlumnos = new MatTableDataSource<Alumno>();
  

  constructor(private fb:FormBuilder, private http:HttpClient) { }



  ngOnInit(): void {
    this.crearFormulario();
    
    this.http.get<Alumno[]>('assets/JsonDatos.json').subscribe (data =>{
      console.log(data);
      this.listaAlumnos.data=data;
    })
    console.log(this.listaAlumnos.data.length);
  }
  
  //Metodo de Crea,Inicializa y AgregaValida los inputs
  crearFormulario():void{
   
    this.formEstudiante = this.fb.group({
      nombre  : ['', [ Validators.required, Validators.minLength(5) ]  ],
      apellido: ['', [Validators.required,Validators.minLength(5)] ],
      dni  : ['', [ Validators.required,Validators.maxLength(8),Validators.pattern("^[0-9]*$")]],
      email  : ['', [ Validators.required,Validators.email]],
      nota  : ['', [ Validators.required,Validators.pattern("^[0-9]*$")]],
    });
  }


  //Chequea que se cumpla las validaciones

  get nombreNoValido(){
    return this.formEstudiante.get('nombre').invalid && this.formEstudiante.get('nombre').touched;
  }

  get apellidoNoValido(){
    return this.formEstudiante.get('apellido').invalid && this.formEstudiante.get('apellido').touched;
  }

  get dniNoValido(){
    return this.formEstudiante.get('dni').invalid && this.formEstudiante.get('dni').touched;
  }

  get emailNoValido(){
    return this.formEstudiante.get('email').invalid && this.formEstudiante.get('email').touched;
  }

  get notaNoValido(){
    return this.formEstudiante.get('nota').invalid && this.formEstudiante.get('nota').touched;
  }

    //Metodo de Crea,Inicializa y AgregaValida los inputs
    
   
     


  //Probando como obtener los valores de los forumarios
  
agregarAlumno(){


  let editar = false;
  let alumno= new Alumno();

  let listaAuxiliar = this.listaAlumnos.data;
  

  alumno.nombre=this.formEstudiante.get('nombre').value;
  alumno.apellido=this.formEstudiante.get('apellido').value;
  alumno.dni=this.formEstudiante.get('dni').value;
  alumno.email=this.formEstudiante.get('email').value;
  alumno.nota=this.formEstudiante.get('nota').value;

 for (const element of listaAuxiliar) {
   if(element.dni == alumno.dni){
    element.nombre = alumno.nombre;
    element.apellido = alumno.apellido;
    element.dni= alumno.dni;
    element.email= alumno.email;
    element.nota = alumno.nota
    editar=true;
   }
 }
if(editar==false){
  listaAuxiliar.push(alumno);
}
  this.listaAlumnos.data = listaAuxiliar;
this.formEstudiante.reset();
}

editarAlumno(element){

 this.formEstudiante.setValue(element);
  
}


eliminarAlumno(element){

console.log(JSON.stringify(this.listaAlumnos.data));
let listaAuxiliar2=this.listaAlumnos.data;
let lis = listaAuxiliar2.filter(data => data.dni != element.dni );
this.listaAlumnos.data=lis;



}



}
