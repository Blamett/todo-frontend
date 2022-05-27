import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AfterIfDirective } from './after-if.directive';
import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmDeleteDialogComponent } from './components/confirm-delete-dialog/confirm-delete-dialog.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { RegisterComponent } from './components/register/register/register.component';
import { PasswordRecoverDialogComponent } from './components/password-recover-dialog/password-recover-dialog.component';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    AfterIfDirective,
    RegisterComponent,
    ConfirmDeleteDialogComponent,
    PasswordRecoverDialogComponent,
  ],
  imports: [
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [{
    provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 }
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
