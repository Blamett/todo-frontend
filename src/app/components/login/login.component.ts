import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { MatDialog } from '@angular/material/dialog';
import { PasswordRecoverDialogComponent } from '../popup\'s/password-recover-dialog/password-recover-dialog.component';


@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
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
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    if (this.httpService.isAuthenticated()) {
      this.router.navigate([""])
    }
  }

  async registerRedirect() {
    this.httpService.logout();
    this.router.navigate(["register"]);
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

  resetPassword() {
    this.dialog.open(PasswordRecoverDialogComponent, {
    });
  }
}
