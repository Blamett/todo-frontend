import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MatSnackBarModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [{
    provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
