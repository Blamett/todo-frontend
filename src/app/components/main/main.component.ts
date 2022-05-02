import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private readonly router: Router,
    private readonly httpService: HttpService,
  ) { }

  ngOnInit(): void {
    if (!this.httpService.isAuthenticated()) {
      this.router.navigate(["login"]);
    }
  }

}
