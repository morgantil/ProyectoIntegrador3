import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public formLogin:FormGroup;
  public credencialesValidas:boolean=null;
  public mostrarLogin=true;
 
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario(){
   
    this.formLogin = this.fb.group({
      user  : ['', [ Validators.required, Validators.minLength(5) ]  ],
      pass: ['', [Validators.required,Validators.minLength(5)] ],
      
    });
  }


  //Chequea que se cumpla las validaciones

  get userNoValido(){
    return this.formLogin.get('user').invalid && this.formLogin.get('user').touched;
  }

  get passNoValido(){
    return this.formLogin.get('pass').invalid && this.formLogin.get('pass').touched;
  }

  enviar():boolean{
   let user = this.formLogin.get('user').value;
   let pass = this.formLogin.get('pass').value;

   this.credencialesValidas = (user == 'admin' && pass == 'admin') ? false : true;

   this.mostrarLogin = this.credencialesValidas;
   console.log('el valor de mostrarCredenciales es',this.mostrarLogin);
   
   return this.credencialesValidas;
  
   }

  }




