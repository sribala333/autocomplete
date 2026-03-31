import { AutocompleteControlPipe } from './autocomplete-control.pipe';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

describe('AutocompleteControlPipe', () => {
  let pipe: AutocompleteControlPipe;

  beforeEach(() => {
    pipe = new AutocompleteControlPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return FormControl from flat FormGroup when subForm is empty and formArrIndex is -1', () => {
    const ctrl = new UntypedFormControl('test');
    const form = new UntypedFormGroup({ username: ctrl });

    const result = pipe.transform('username', form, '', -1);
    expect(result).toBe(ctrl);
  });

  it('should return FormControl from nested FormGroup when subForm is provided and formArrIndex is -1', () => {
    const ctrl = new UntypedFormControl('nested');
    const form = new UntypedFormGroup({
      address: new UntypedFormGroup({ city: ctrl })
    });

    const result = pipe.transform('city', form, 'address', -1);
    expect(result).toBe(ctrl);
  });

  it('should return FormControl from FormArray when formArrIndex is not -1', () => {
    const ctrl = new UntypedFormControl('item');
    const form = new UntypedFormGroup({
      items: new UntypedFormArray([
        new UntypedFormGroup({ productId: ctrl })
      ])
    });

    const result = pipe.transform('productId', form, 'items', 0);
    expect(result).toBe(ctrl);
  });

  it('should return correct FormControl from a specific FormArray index', () => {
    const ctrl0 = new UntypedFormControl('first');
    const ctrl1 = new UntypedFormControl('second');
    const form = new UntypedFormGroup({
      items: new UntypedFormArray([
        new UntypedFormGroup({ name: ctrl0 }),
        new UntypedFormGroup({ name: ctrl1 })
      ])
    });

    expect(pipe.transform('name', form, 'items', 0)).toBe(ctrl0);
    expect(pipe.transform('name', form, 'items', 1)).toBe(ctrl1);
  });
});
