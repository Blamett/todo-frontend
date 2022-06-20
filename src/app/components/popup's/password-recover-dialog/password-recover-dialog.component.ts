import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-password-recover-dialog',
  templateUrl: './password-recover-dialog.component.html',
  styleUrls: ['./password-recover-dialog.component.scss']
})
export class PasswordRecoverDialogComponent implements OnInit {

  constructor(
    private readonly router: Router,
    private readonly httpService: HttpService,
  ) { }

  ngOnInit(): void {
  }

  async SendMail(emailInput: string, message1: HTMLLabelElement, message2: HTMLLabelElement) {
    try {
      const res = await this.httpService.post('forgot-password', {
        email: emailInput
      })

      message1.innerText = 'Email sent!'
      message2.innerText = 'If this Email have an account check your spam to reset password'
    }
    catch (e) {

    }
  }

}
