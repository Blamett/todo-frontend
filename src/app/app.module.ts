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
import { ConfirmDeleteDialogComponent } from './components/popup\'s/confirm-delete-dialog/confirm-delete-dialog.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { RegisterComponent } from './components/register/register.component';
import { PasswordRecoverDialogComponent } from './components/popup\'s/password-recover-dialog/password-recover-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { PasswordRecoveryTabComponent } from './components/password-recovery/password-recovery-tab.component';
import { PasswordChangedComponent } from './components/popup\'s/password-changed-dialog/password-changed.component';
import { DragDropModule } from '@angular/cdk/drag-drop'
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    AfterIfDirective,
    RegisterComponent,
    ConfirmDeleteDialogComponent,
    PasswordRecoverDialogComponent,
    PasswordRecoveryTabComponent,
    PasswordChangedComponent,
  ],
  imports: [
    MatDividerModule,
    MatMenuModule,
    MatSnackBarModule,
    MatPaginatorModule,
    DragDropModule,
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
