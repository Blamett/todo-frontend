import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from "firebase/auth";
import { HttpService } from '../../services/http.service';
import { PasswordRecoverDialogComponent } from '../popup\'s/password-recover-dialog/password-recover-dialog.component';

const provider = new GoogleAuthProvider();

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  durationInSeconds = 5;

  title = 'new-todo-frontend';

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

  async login(form: NgForm) {

    const res = await this.httpService.post('login', form.form.value);

    if (res.statusCode > 299 || res.statusCode < 200) {
      this._snackBar.open('Usuário ou Senha inválidos', 'Fechar');
    }
    else if (res.statusCode === 200) {
      this.router.navigate([""]);
    }

  }

  // async loginGoogle() {
  //   const auth = getAuth();
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential.accessToken;
  //       localStorage.setItem("token", token)
  //       // The signed-in user info.
  //       const user = result.user;
  //       // ...
  //     }).catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // The email of the user's account used.
  //       const email = error.customData.email;
  //       // The AuthCredential type that was used.
  //       const credential = GoogleAuthProvider.credentialFromError(error);
  //       // ...
  //     });
  // }

  resetPassword() {
    this.dialog.open(PasswordRecoverDialogComponent, {
    });
  }
}
