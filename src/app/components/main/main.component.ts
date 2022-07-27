import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { ConfirmDeleteDialogComponent, ConfirmDeleteDialogData } from '../popup\'s/confirm-delete-dialog/confirm-delete-dialog.component';
import { Todo } from './todo';

// Import the functions you need from the SDKs you need
import { getAnalytics, logEvent } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getDownloadURL, getMetadata, getStorage, ref, uploadBytes } from "firebase/storage";
import { SettingsDialogComponent } from '../popup\'s/settings-dialog/settings-dialog.component';

const firebaseConfig = {
  apiKey: "AIzaSyAb8G-GPbDOoCBVqxPVVfldOj8M9NA82pk",
  authDomain: "todoapp-6cb9e.firebaseapp.com",
  projectId: "todoapp-6cb9e",
  storageBucket: "todoapp-6cb9e.appspot.com",
  messagingSenderId: "1030358084338",
  appId: "1:1030358084338:web:4c1b9f28edcdab55913e6b",
  measurementId: "G-V5TS53W228"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const analytics = getAnalytics(app);
logEvent(analytics, 'notification_received');

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  todos: Todo[] = [];
  count: number;
  date = new Date()
  pageEvent: PageEvent;
  inputodo: string = '';
  userNameMeta: string
  userProfilePicture: string
  isLoaded:boolean = false

  @ViewChild("userLabel")
  username: ElementRef;

  @ViewChild("emailLabel")
  email: ElementRef;

  private isEditModeMap = new Map<Todo, boolean>();

  constructor(
    private readonly router: Router,
    private readonly httpService: HttpService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.redirectNonAuthorized();
    this.getUsernameAndEmail();
  }

  ngAfterViewInit(): void {
    this.getUserProfilePicture()
    this.refreshTodos()
  }

  async getUserProfilePicture() {

    const userImg = localStorage.getItem("userImg")

    const storageRef = ref(storage, userImg);

    await getMetadata(storageRef)
      .then((metadata0) => {

        const userStoragaRef = ref(storage, `${metadata0.name}`);

        getDownloadURL(userStoragaRef).then((downloadURL) => {
          this.userProfilePicture = downloadURL
        });

      })
      .catch((error) => {
        console.log("Uh-oh, an error occurred!")
      });
  }

  async getUsernameAndEmail() {

    const user = await this.httpService.get('user/me')
    const userRes = (user.responseBody as { username: string, email: string })

    this.userNameMeta = userRes.username

    this.username.nativeElement.innerText = userRes.username
    this.email.nativeElement.innerText = userRes.email

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

  }

  async isDoneCheckbox(id: string, isDone: boolean) {
    await this.httpService.patch(`todos/${id}`, {
      isDone
    })
    this.refreshTodos()
  }

  async refreshTodos(ev?: Partial<PageEvent>) {
    this.isLoaded = false
    ev = ev || { pageIndex: 0, pageSize: 12 };
    const res = await this.httpService.get(`todos`, { page: ev.pageIndex, limit: ev.pageSize })
    const todoRes = (res.responseBody as { todos: Todo[], count: number })
    this.isLoaded = true
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

  settingsTab(){

    this.dialog.open(SettingsDialogComponent, {
      height: '690px',
      width: '1060px',
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

  redirectNonAuthorized() {
    if (!this.httpService.isAuthenticated()) {
      this.router.navigate(["login"]);
    }
  }

  backToMain() {
    if (!this.httpService.isAuthenticated()) {
      this.router.navigate([""]);
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

  logout() {
    this.httpService.logout();
  }

  private async readFile(file: File): Promise<ArrayBuffer> {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.addEventListener("loadend", (ev) => {

        if (reader.error) {
          rej(reader.error);
        }

        if (reader.result) {
          res(reader.result as ArrayBuffer);
        }

      });
      reader.readAsArrayBuffer(file);
    });
  }

}