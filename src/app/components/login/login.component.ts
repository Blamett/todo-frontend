import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { MatDialog } from '@angular/material/dialog';
import { PasswordRecoverDialogComponent } from '../popup\'s/password-recover-dialog/password-recover-dialog.component';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

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

  async loginGoogle() {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        localStorage.setItem("token", token)
        // The signed-in user info.
        const user = result.user;
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  resetPassword() {
    this.dialog.open(PasswordRecoverDialogComponent, {
    });
  }
}
