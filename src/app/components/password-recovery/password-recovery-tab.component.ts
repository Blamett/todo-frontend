import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { MatDialog } from '@angular/material/dialog';
import { PasswordChangedComponent } from '../popup\'s/password-changed-dialog/password-changed.component';

@Component({
  selector: 'app-password-recovery-tab',
  templateUrl: './password-recovery-tab.component.html',
  styleUrls: ['./password-recovery-tab.component.scss']
})
export class PasswordRecoveryTabComponent implements OnInit {

  token: string;

  constructor(
    private _snackBar: MatSnackBar,
    private httpService: HttpService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    public dialog: MatDialog,
  ) {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    })
  }

  ngOnInit(): void {
    if (this.httpService.isAuthenticated()) {
      this.router.navigate([""])
    }

  }

  backLogin() {
    this.httpService.logout();
    this.router.navigate(["login"]);
  }

  async changePassword(newPassword: string, newPasswordConfirm: string,) {
    if (newPassword === newPasswordConfirm) {
      const res = await this.httpService.post('change-password', {
        token: this.token,
        password: newPassword
      });
    }

    this.dialog.open(PasswordChangedComponent, {
    });
  }

}
