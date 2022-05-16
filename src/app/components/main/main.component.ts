import { Component, Directive, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit  {

  date = new Date()

  constructor(
    private readonly router: Router,
    private readonly httpService: HttpService,
  ) { }

  ngOnInit(): void {
    this.outroMetodo();
  }

  ngAfterViewInit(): void{
    this.refreshTodos()
  }

  async refreshTodos() {
    const res = await this.httpService.get(`todos/${"user.id aq"}`)
    console.log(res)
  }

  outroMetodo() {
    if (!this.httpService.isAuthenticated()) {
      this.router.navigate(["login"]);
    }
  }

}
