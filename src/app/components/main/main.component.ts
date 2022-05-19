import { Component, Directive, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { Todo } from './todo';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  todos: Todo[] = [];
  date = new Date()
  inputodo: string = '';

  constructor(
    private readonly router: Router,
    private readonly httpService: HttpService,
  ) { }

  ngOnInit(): void {
    this.outroMetodo();
  }

  ngAfterViewInit(): void {
    this.refreshTodos()
  }

  async refreshTodos() {
    const res = await this.httpService.get(`todos`)
    const todoRes = (res.responseBody as Todo[])
    this.todos = todoRes
  }

  async createTodo() {
    await this.httpService.post('todos', {
      task: this.inputodo,
      isDone: 0
    })
    this.inputodo = ''
    this.refreshTodos()
  }  

  async deleteTodo() {
    await this.httpService.delete(`todos/${""}`)
    this.refreshTodos()
  }  

  //TODO finalizar delete

  outroMetodo() {
    if (!this.httpService.isAuthenticated()) {
      this.router.navigate(["login"]);
    }
  }

}
