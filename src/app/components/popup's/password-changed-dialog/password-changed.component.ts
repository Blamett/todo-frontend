import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-password-changed',
  templateUrl: './password-changed.component.html',
  styleUrls: ['./password-changed.component.scss']
})

export class PasswordChangedComponent implements OnInit {

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

  async loginRedirect() {
    this.httpService.logout();
    this.router.navigate(["login"]);
  }


}
