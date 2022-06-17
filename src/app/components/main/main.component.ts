import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { ConfirmDeleteDialogComponent, ConfirmDeleteDialogData } from '../popup\'s/confirm-delete-dialog/confirm-delete-dialog.component';
import { Todo } from './todo';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  todos: Todo[] = [];
  count: number;
  date = new Date()
  pageEvent: PageEvent;
  inputodo: string = '';

  private isEditModeMap = new Map<Todo, boolean>();

  constructor(
    private readonly router: Router,
    private readonly httpService: HttpService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.redirectNonAuthorized();
  }

  ngAfterViewInit(): void {
    this.refreshTodos()
  }

  async drop(event: CdkDragDrop<Todo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

    await this.httpService.post('todos/order', {
      previousIndex: event.previousIndex,
      currentIndex: event.currentIndex

    })

    console.log(event.previousIndex, event.currentIndex);
  }

  async isDoneCheckbox(id: string, isDone: boolean) {
    await this.httpService.patch(`todos/${id}`, {
      isDone
    })
    this.refreshTodos()
  }

  async refreshTodos(ev?: Partial<PageEvent>) {
    ev = ev || { pageIndex: 0, pageSize: 12 };
    const res = await this.httpService.get(`todos`, { page: ev.pageIndex, limit: ev.pageSize })
    const todoRes = (res.responseBody as { todos: Todo[], count: number })
    this.todos = todoRes.todos
    this.count = todoRes.count
  }

  async createTodo() {
    await this.httpService.post('todos', {
      task: this.inputodo,
      isDone: 0
    })
    this.inputodo = ''
    this.refreshTodos()
  }

  confirmDelete(id: string) {
    this.dialog.open(ConfirmDeleteDialogComponent, {
      data: {
        onYesCallback: () => {
          this.deleteTodo(id);
        }
      } as ConfirmDeleteDialogData
    });
  }

  async deleteTodo(id: string) {
    await this.httpService.delete(`todos/${id}`)
    await this.refreshTodos()
  }

  async updateTodo(id: string, task: string) {
    if (task != '') {
      await this.httpService.patch(`todos/${id}`, {
        task
      })
      this.refreshTodos()
    }
  }

  logout() {
    this.httpService.logout();
    this.router.navigate(["login"]);
  }

  redirectNonAuthorized() {
    if (!this.httpService.isAuthenticated()) {
      this.router.navigate(["login"]);
    }
  }

  toggleEditItem(todo: Todo) {
    this.isEditModeMap.set(todo, !this.isEditModeMap.get(todo));
  }

  isItemEditMode(todo: Todo) {
    if (!this.isEditModeMap.has(todo)) {
      this.isEditModeMap.set(todo, false);
    }
    return this.isEditModeMap.get(todo);
  }

  focusField(field: HTMLInputElement) {
    field.focus();
  }
}
