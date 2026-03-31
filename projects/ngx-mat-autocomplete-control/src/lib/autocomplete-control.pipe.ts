import { Pipe, PipeTransform } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Pipe({
  name: 'autocompleteControl',
  standalone: false
})
export class AutocompleteControlPipe implements PipeTransform {
  transform(
    value: any,
    mainForm: UntypedFormGroup,
    subForm: string,
    formArrIndex: number
  ): UntypedFormControl {
    if (formArrIndex != -1) {
      const formArr = mainForm.controls[subForm] as UntypedFormArray;
      return (formArr.controls[formArrIndex] as UntypedFormGroup).controls[
        value
      ] as UntypedFormControl;
    } else if (subForm !== '') {
      const formArr = mainForm.controls[subForm] as UntypedFormGroup;
      return formArr.controls[value] as UntypedFormControl;
    } else {
      return mainForm?.controls[value] as UntypedFormControl;
    }
  }
}