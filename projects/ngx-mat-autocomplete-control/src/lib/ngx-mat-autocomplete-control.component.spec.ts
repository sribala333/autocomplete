import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { UntypedFormControl } from '@angular/forms';
import { SimpleChange, SimpleChanges } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NgxMatAutocompleteControlComponent } from './ngx-mat-autocomplete-control.component';
import { NgxMatAutocompleteControlModule } from './ngx-mat-autocomplete-control.module';

describe('NgxMatAutocompleteControlComponent', () => {
  let component: NgxMatAutocompleteControlComponent;
  let fixture: ComponentFixture<NgxMatAutocompleteControlComponent>;

  const mockOptions = [
    { userId: 1, userName: 'Sriram' },
    { userId: 2, userName: 'Bala' },
    { userId: 3, userName: 'Subashini' }
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NgxMatAutocompleteControlModule, NoopAnimationsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMatAutocompleteControlComponent);
    component = fixture.componentInstance;
    component.control = new UntypedFormControl('');
    component.refId = 'userId';
    component.refName = 'userName';
    component.options = mockOptions;
    component.label = 'User';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // --- ngOnInit ---
  describe('ngOnInit', () => {
    it('should populate filterList from options on init', () => {
      expect(component.filterList.length).toBe(3);
    });

    it('should not fail if options is null', () => {
      component.options = null as any;
      expect(() => component.ngOnInit()).not.toThrow();
    });
  });

  // --- ngOnChanges ---
  describe('ngOnChanges', () => {
    it('should store tempValue and reset when control value > 0', fakeAsync(() => {
      component.control.setValue(2);
      const changes: SimpleChanges = {
        options: new SimpleChange(null, mockOptions, false)
      };
      component.ngOnChanges(changes);
      tick(1);
      expect(component.control.value).toBe(2);
    }));

    it('should not store tempValue when control value is 0 or empty', () => {
      component.control.setValue('');
      const changes: SimpleChanges = {
        options: new SimpleChange(null, mockOptions, false)
      };
      component.ngOnChanges(changes);
      expect(component.tempValue).toBeUndefined();
    });

    it('should disable control when disabled change is true', () => {
      const changes: SimpleChanges = {
        disabled: new SimpleChange(false, true, false)
      };
      component.ngOnChanges(changes);
      expect(component.control.disabled).toBeTrue();
    });

    it('should enable control when disabled change is false', () => {
      component.control.disable();
      const changes: SimpleChanges = {
        disabled: new SimpleChange(true, false, false)
      };
      component.ngOnChanges(changes);
      expect(component.control.enabled).toBeTrue();
      expect(component.disabled).toBeFalse();
    });

    it('should enable control when no disabled change is present', () => {
      const changes: SimpleChanges = {
        options: new SimpleChange(null, mockOptions, false)
      };
      component.ngOnChanges(changes);
      expect(component.control.enabled).toBeTrue();
    });
  });

  // --- setItems ---
  describe('setItems', () => {
    it('should copy all options when value is empty', () => {
      component.setItems('');
      expect(component.filterList.length).toBe(3);
    });

    it('should filter options by refName when value is provided', () => {
      component.setItems('Sri');
      expect(component.filterList.length).toBe(1);
      expect((component.filterList[0] as any).userName).toBe('Sriram');
    });

    it('should return empty list when no match found', () => {
      component.setItems('zzz');
      expect(component.filterList.length).toBe(0);
    });

    it('should be case-insensitive', () => {
      component.setItems('sriram');
      expect(component.filterList.length).toBe(1);
    });
  });

  // --- assignResourceCopy ---
  describe('assignResourceCopy', () => {
    it('should copy all options to filterList', () => {
      component.filterList = [];
      component.assignResourceCopy();
      expect(component.filterList.length).toBe(mockOptions.length);
    });
  });

  // --- keyUpFunction ---
  describe('keyUpFunction', () => {
    it('should return false and call preventDefault for Enter key', () => {
      const event = { key: 'Enter', preventDefault: jasmine.createSpy('preventDefault') };
      const result = component.keyUpFunction(event, 'test');
      expect(result).toBeFalse();
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should return false and call preventDefault for Tab key', () => {
      const event = { key: 'Tab', preventDefault: jasmine.createSpy('preventDefault') };
      const result = component.keyUpFunction(event, 'test');
      expect(result).toBeFalse();
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should set keyUp to true and emit propValueEvent when value matches an option', () => {
      spyOn(component.propValueEvent, 'emit');
      component.setItems('');
      const event = { key: 'a' };
      const result = component.keyUpFunction(event, 'Sriram');
      expect(result).toBeTrue();
      expect(component.keyUp).toBeTrue();
      expect(component.propValueEvent.emit).toHaveBeenCalledWith({
        propertyName: component.control,
        value: 'Sriram'
      });
    });

    it('should set keyUp to true when value does not match any option', () => {
      component.setItems('');
      const event = { key: 'a' };
      component.keyUpFunction(event, 'NonExistent');
      expect(component.keyUp).toBeTrue();
    });

    it('should set keyUp to false when value is empty', () => {
      spyOn(component.propValueEvent, 'emit');
      const event = { key: 'Backspace' };
      const result = component.keyUpFunction(event, '');
      expect(result).toBeTrue();
      expect(component.keyUp).toBeFalse();
      expect(component.propValueEvent.emit).toHaveBeenCalled();
    });
  });

  // --- displayDataFn ---
  describe('displayDataFn', () => {
    it('should return null for null/undefined/empty data', () => {
      const fn = component.displayDataFn;
      expect(fn(null)).toBeNull();
      expect(fn(undefined)).toBeNull();
      expect(fn('')).toBeNull();
    });

    it('should return refName when data matches an option', () => {
      component.setItems('');
      const fn = component.displayDataFn;
      expect(fn(1)).toBe('Sriram');
    });

    it('should return null when filterList is empty', () => {
      component.filterList = [];
      const fn = component.displayDataFn;
      expect(fn(1)).toBeNull();
    });

    it('should return null when data does not match any option', () => {
      component.setItems('');
      const fn = component.displayDataFn;
      expect(fn(999)).toBeNull();
    });
  });

  // --- checkValidValue ---
  describe('checkValidValue', () => {
    it('should do nothing when control value is empty string', () => {
      component.control.setValue('');
      component.checkValidValue();
      expect(component.control.errors).toBeNull();
    });

    it('should do nothing when control value is null', () => {
      component.control.setValue(null);
      component.checkValidValue();
      expect(component.control.errors).toBeNull();
    });

    it('should set incorrect error when keyUp is true', () => {
      component.control.setValue('something');
      component.keyUp = true;
      component.checkValidValue();
      expect(component.control.errors).toEqual({ incorrect: true });
    });

    it('should clear errors when keyUp is false and value exists', () => {
      component.control.setValue(1);
      component.control.setErrors({ incorrect: true });
      component.keyUp = false;
      component.checkValidValue();
      expect(component.control.errors).toBeNull();
    });
  });

  // --- checVal ---
  describe('checVal', () => {
    it('should set control value to refId when matching option found (showDefaultSelect=false)', () => {
      component.showDefaultSelect = false;
      component.setItems('');
      component.keyUp = true;
      component.checVal('Sriram');
      expect(component.control.value).toBe(1);
      expect(component.keyUp).toBeFalse();
    });

    it('should not set value when no matching option found', () => {
      component.showDefaultSelect = false;
      component.control.setValue('');
      component.keyUp = true;
      component.checVal('NonExistent');
      expect(component.control.value).toBe('');
    });

    it('should do nothing when showDefaultSelect is true', () => {
      component.showDefaultSelect = true;
      component.control.setValue('');
      component.checVal('Sriram');
      expect(component.control.value).toBe('');
    });

    it('should call checkValidValue after checking', () => {
      spyOn(component, 'checkValidValue');
      component.showDefaultSelect = false;
      component.checVal('Sriram');
      expect(component.checkValidValue).toHaveBeenCalled();
    });

    it('should match trimmed and case-insensitive values', () => {
      component.showDefaultSelect = false;
      component.setItems('');
      component.checVal('  sriram  ');
      expect(component.control.value).toBe(1);
    });
  });

  // --- emitValues ---
  describe('emitValues', () => {
    it('should emit selectionChange and propValueEvent with the selected value', () => {
      spyOn(component.selectionChange, 'emit');
      spyOn(component.propValueEvent, 'emit');
      const mockEvent = { option: { value: 2 } };
      component.emitValues(mockEvent);
      expect(component.selectionChange.emit).toHaveBeenCalledWith(2);
      expect(component.propValueEvent.emit).toHaveBeenCalledWith({
        propertyName: component.control,
        value: 2
      });
    });
  });

  // --- trackByFn ---
  describe('trackByFn', () => {
    it('should return the index', () => {
      expect(component.trackByFn(0, {})).toBe(0);
      expect(component.trackByFn(5, { id: 1 })).toBe(5);
    });
  });
});
