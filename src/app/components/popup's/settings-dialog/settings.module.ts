import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account tab/account.component';
import { SettingsDialogComponent } from './settings-dialog.component';


const appRoutes: Routes = [
    { path: "account", component: AccountComponent, outlet: 'settings'},
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forChild(
      appRoutes
    )
  ],
  declarations: [
    SettingsDialogComponent,
    AccountComponent
  ],
  bootstrap: [ SettingsDialogComponent ]
})
export class SettingsModule { }