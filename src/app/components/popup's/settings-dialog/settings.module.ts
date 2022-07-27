import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { SettingsDialogComponent } from './settings-dialog.component';


const appRoutes: Routes = [
    { path: "test", component: TestComponent, outlet: 'settings'},
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
    TestComponent
  ],
  bootstrap: [ SettingsDialogComponent ]
})
export class SettingsModule { }