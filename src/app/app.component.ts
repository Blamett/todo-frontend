import { Component } from '@angular/core';
import { HttpService } from './services/http.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  durationInSeconds = 5;


  title = 'new-todo-frontend';

  user: string = '';
  pass: string = '';

  constructor(
    private _snackBar: MatSnackBar,
    private httpService: HttpService,
  ) { };

  async register() {
    // console.log(this.user, this.pass)
    const res = await this.httpService.post('user', {
      username: this.user,
      password: this.pass
    });
    if(res.statusCode === 500){
      this._snackBar.open('Usuário ja existente', 'Fechar');
    }
    else if(res.statusCode > 299 || res.statusCode < 200){
      this._snackBar.open(`Senha deve conter -  Letras Maiúsculas (ABC), Minúsculas (abc), Caractere Especial (#$&) e Números (123)`, 'Fechar', {
        duration: this.durationInSeconds * 1000
      })
   }
   else if(res.statusCode === 201){
     this._snackBar.open('Usuário Registrado!', 'Fechar')
   }

  }

  async login() {
    const res = await this.httpService.post('login', {
      username: this.user,
      password: this.pass
    });
    if(res.statusCode > 299 || res.statusCode < 200){
       this._snackBar.open('Usuário ou Senha inválidos', 'Fechar');
    }
    else if(res.statusCode === 200){
      
    }
  }
}
