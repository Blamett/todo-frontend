import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account tab/account.component';
import { SettingsDialogComponent } from './settings-dialog.component';
import { ThemeComponent } from './themes tab/theme.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';

const appRoutes: Routes = [
    { path: "account", component: AccountComponent, outlet: 'settings'},
    { path: "theme", component: ThemeComponent, outlet: 'settings'},
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forChild(
      appRoutes
    ),
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  declarations: [
    SettingsDialogComponent,
    AccountComponent,
    ThemeComponent,
  ],
  bootstrap: [ SettingsDialogComponent ]
})
export class SettingsModule { }