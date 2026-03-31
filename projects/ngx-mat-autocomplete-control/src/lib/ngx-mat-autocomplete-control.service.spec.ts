import { TestBed } from '@angular/core/testing';

import { NgxMatAutocompleteControlService } from './ngx-mat-autocomplete-control.service';

describe('NgxMatAutocompleteControlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxMatAutocompleteControlService = TestBed.inject(NgxMatAutocompleteControlService);
    expect(service).toBeTruthy();
  });
});
