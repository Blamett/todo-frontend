import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  durationInSeconds = 5;

  title = 'new-todo-frontend';

  user: string = '';
  pass: string = '';

  constructor(
    private _snackBar: MatSnackBar,
    private httpService: HttpService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    if (this.httpService.isAuthenticated()) {
      this.router.navigate([""])
    }
  }

  async register() {

    const res = await this.httpService.post('user', {
      username: this.user,
      password: this.pass
    });
    if (res.statusCode === 500) {
      this._snackBar.open('Usuário ja existente', 'Fechar');
    }
    else if (res.statusCode > 299 || res.statusCode < 200) {
      this._snackBar.open(`Senha deve conter -  Letras Maiúsculas (ABC), Minúsculas (abc), Caractere Especial (#$&) e Números (123)`, 'Fechar', {
        duration: this.durationInSeconds * 1000
      })
    }
    else if (res.statusCode === 201) {
      this._snackBar.open('Usuário Registrado!', 'Fechar')
    }

  }

  async login() {
    const res = await this.httpService.post('login', {
      username: this.user,
      password: this.pass
    });
    if (res.statusCode > 299 || res.statusCode < 200) {
      this._snackBar.open('Usuário ou Senha inválidos', 'Fechar');
    }
    else if (res.statusCode === 200) {
      this.router.navigate([""]);
    }
  }
}
