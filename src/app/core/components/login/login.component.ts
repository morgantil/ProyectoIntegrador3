import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/Interfaces/UserInterface';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public formLogin: FormGroup;
  public credencialesValidas: boolean = null;
  public mostrarLogin = true;
  listaUser: User[] = [];
  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.crearFormulario();
    this.getUsuarios();
  }

  crearFormulario() {
    this.formLogin = this.fb.group({
      user: ['', [Validators.required, Validators.minLength(5)]],
      pass: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  //Chequea que se cumpla las validaciones

  get userNoValido() {
    return (
      this.formLogin.get('user').invalid && this.formLogin.get('user').touched
    );
  }

  get passNoValido() {
    return (
      this.formLogin.get('pass').invalid && this.formLogin.get('pass').touched
    );
  }

  enviar(): boolean {
    let user = this.formLogin.get('user').value;
    let pass = this.formLogin.get('pass').value;

    console.log('LOS QUE ENTRA', user, pass);

    for (let usuario of this.listaUser) {
      if (user == usuario.user && pass == usuario.pass) {
        this.credencialesValidas = true;
        localStorage.setItem('rol',usuario.rol);
      }
    }
    this.mostrarLogin = !this.credencialesValidas;

    return this.credencialesValidas;
  }

  getUsuarios() {
    this.http
      .get<User[]>('https://62e31bd53891dd9ba8f450e1.mockapi.io/Usuarios')
      .subscribe((data) => {
        console.log(data);
        this.listaUser = data;
        console.log('LA LISTA ES', data);
      });
  }
}
