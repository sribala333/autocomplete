import { NgModule } from '@angular/core';
import { NgxMatAutocompleteControlComponent } from './ngx-mat-autocomplete-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { HighlightPipe } from './highlight.pipe';
import { AutocompleteControlPipe } from './autocomplete-control.pipe';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [NgxMatAutocompleteControlComponent, HighlightPipe, AutocompleteControlPipe],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  exports: [NgxMatAutocompleteControlComponent,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule]
})
export class NgxMatAutocompleteControlModule { }
