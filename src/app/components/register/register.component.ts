import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  durationInSeconds = 5;

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


  async register(email: string, username: string, password: string) {

    const res = await this.httpService.post('user', {
      email: email,
      username: username,
      password: password
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

    localStorage.setItem("userImg", "default.png")

  }

  async loginRedirect() {
    this.httpService.logout();
    this.router.navigate(["login"]);
  }

}
