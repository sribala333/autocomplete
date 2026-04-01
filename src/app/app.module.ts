import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgxMatAutocompleteControlModule } from 'ngx-mat-autocomplete-control';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgxMatAutocompleteControlModule
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
