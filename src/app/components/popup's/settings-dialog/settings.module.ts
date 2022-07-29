import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account tab/account.component';
import { SettingsDialogComponent } from './settings-dialog.component';
import { ThemeComponent } from './themes tab/theme.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import { DonationsComponent } from './donations tab/donations.component';
import { ActivityComponent } from './activity tab/activity.component';
import { IntegrationsComponent } from './integrations tab/integration.component';

const appRoutes: Routes = [
    { path: "account", component: AccountComponent, outlet: 'settings'},
    { path: "theme", component: ThemeComponent, outlet: 'settings'},
    { path: "donations", component: DonationsComponent, outlet: 'settings'},
    { path: "activity", component: ActivityComponent, outlet: 'settings'},
    { path: "integrations", component: IntegrationsComponent, outlet: 'settings'},
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
    DonationsComponent,
    ActivityComponent,
    IntegrationsComponent
  ],
  bootstrap: [ SettingsDialogComponent ]
})
export class SettingsModule { }