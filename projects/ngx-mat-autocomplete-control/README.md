# ngx-mat-autocomplete-control

[![npm version](https://img.shields.io/npm/v/ngx-mat-autocomplete-control.svg)](https://www.npmjs.com/package/ngx-mat-autocomplete-control)
[![license](https://img.shields.io/npm/l/ngx-mat-autocomplete-control.svg)](https://www.npmjs.com/package/ngx-mat-autocomplete-control)
[![downloads](https://img.shields.io/npm/dm/ngx-mat-autocomplete-control.svg)](https://www.npmjs.com/package/ngx-mat-autocomplete-control)

A powerful, ready-to-use **Angular Material Autocomplete** component that works seamlessly with **Reactive Forms**. Drop it into any Angular project and get a fully featured searchable dropdown with highlighting, validation, and keyboard support — in minutes, not hours.

---

## Features

- **Reactive Forms** support out of the box (`FormControl` / `FormGroup`)
- **Search-as-you-type** with real-time filtering
- **Highlight matching text** in dropdown options (customizable color)
- **Built-in validation** — required field + invalid selection errors
- **Keyboard navigation** — full arrow-key, Enter, and Tab support
- **Configurable appearance** — supports all Material form-field appearances (`outline`, `fill`)
- **Lightweight** — thin wrapper around Angular Material with zero extra dependencies
- **Always up to date** — supports **Angular 21** and Angular Material 21

---

<!--## Demo

![autocomplete-demo](https://media.giphy.com/placeholder)  Replace with an actual GIF/screenshot of your component -->

---

## Installation

```bash
npm install ngx-mat-autocomplete-control
```

### Peer Dependencies

Make sure you have these installed in your project:

| Package              | Version   |
| -------------------- | --------- |
| `@angular/core`      | `^21.0.0` |
| `@angular/common`    | `^21.0.0` |
| `@angular/forms`     | `^21.0.0` |
| `@angular/material`  | `^21.0.0` |
| `@angular/cdk`       | `^21.0.0` |

> For older Angular versions, use `ngx-mat-autocomplete-control@2.x`.

---

## Quick Start

### 1. Import the module

```typescript
import { NgxMatAutocompleteControlModule } from 'ngx-mat-autocomplete-control';

@NgModule({
  imports: [
    NgxMatAutocompleteControlModule
  ]
})
export class AppModule {}
```

### 2. Add the component to your template

```html
<ngx-mat-autocomplete-control
  [control]="'userId' | autocompleteControl: userForm:'':-1"
  [options]="userList"
  [required]="true"
  [refId]="'userId'"
  [refName]="'userName'"
  [label]="'Select User'"
  [appearance]="'outline'"
  [highlightColor]="'red'"
  (selectionChange)="onUserSelected($event)"
  (propValueEvent)="onKeyup($event)">
</ngx-mat-autocomplete-control>
```

### 3. Set up the component class

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-picker',
  templateUrl: './user-picker.component.html'
})
export class UserPickerComponent implements OnInit {
  userForm!: FormGroup;

  userList = [
    { userId: 1, userName: 'Sriram M P' },
    { userId: 2, userName: 'Balamurugan' },
    { userId: 3, userName: 'Subashini' },
    { userId: 4, userName: 'Narmatha' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      userId: ['', Validators.required]
    });
  }

  onUserSelected(selectedValue: any): void {
    console.log('Selected:', selectedValue);
  }

  onKeyup(event: { propertyName: any; value: any }): void {
    console.log('Typed:', event.value);
  }
}
```

---

## API Reference

### Inputs

| Property           | Type                | Default     | Description                                                             |
| ------------------ | ------------------- | ----------- | ----------------------------------------------------------------------- |
| `control`          | `AbstractControl`   | —           | The `FormControl` to bind the selected value to                         |
| `options`          | `any[]`             | `[]`        | Array of objects to display as dropdown options                         |
| `refId`            | `string`            | `''`        | Property name used as the **value** (stored in the form control)        |
| `refName`          | `string`            | `''`        | Property name used as the **display text** and search term              |
| `label`            | `string`            | `''`        | Placeholder / label for the form field                                  |
| `required`         | `boolean`           | `false`     | Whether the field is required                                           |
| `highlightColor`   | `string`            | `'black'`   | Color used to highlight matching text in the dropdown                   |
| `appearance`       | `string`            | `'outline'` | Material form-field appearance: `'outline'` or `'fill'`                 |
| `checkValid`       | `boolean`           | `true`      | Whether to validate that the typed text matches a valid option          |
| `showDefaultSelect`| `boolean`           | `false`     | When `true`, skips auto-selecting the first matching option on blur     |
| `disabled`         | `boolean`           | `false`     | Disables the input                                                      |

### Outputs

| Event              | Payload                                          | Description                                  |
| ------------------ | ------------------------------------------------ | -------------------------------------------- |
| `selectionChange`  | Selected `refId` value                           | Fires when the user picks an option           |
| `propValueEvent`   | `{ propertyName: FormControl, value: string }`   | Fires on every keyup with the current input   |

### Pipe: `autocompleteControl`

A helper pipe to extract the correct `FormControl` from nested form structures.

```
'controlName' | autocompleteControl: formGroup : subFormName : formArrayIndex
```

| Param            | Description                                         |
| ---------------- | --------------------------------------------------- |
| `formGroup`      | The parent `FormGroup`                              |
| `subFormName`    | Nested `FormGroup` or `FormArray` name (`''` if none) |
| `formArrayIndex` | Index inside a `FormArray` (`-1` if not applicable) |

---

## Examples

### Basic usage (flat form)

```html
<ngx-mat-autocomplete-control
  [control]="'cityId' | autocompleteControl: myForm:'':-1"
  [options]="cities"
  [refId]="'id'"
  [refName]="'name'"
  [label]="'City'">
</ngx-mat-autocomplete-control>
```

### Inside a FormArray

```html
<div *ngFor="let item of items.controls; let i = index">
  <ngx-mat-autocomplete-control
    [control]="'productId' | autocompleteControl: myForm:'items':i"
    [options]="products"
    [refId]="'id'"
    [refName]="'productName'"
    [label]="'Product'">
  </ngx-mat-autocomplete-control>
</div>
```

### With custom highlight color

```html
<ngx-mat-autocomplete-control
  [control]="'countryId' | autocompleteControl: myForm:'':-1"
  [options]="countries"
  [refId]="'code'"
  [refName]="'countryName'"
  [label]="'Country'"
  [highlightColor]="'#1976d2'"
  [appearance]="'fill'">
</ngx-mat-autocomplete-control>
```

---

## Version Compatibility

| Library Version | Angular Version |
| --------------- | --------------- |
| `3.x`           | 21              |
| `2.x`           | 13 – 19         |

---

## Contributing

Contributions, issues, and feature requests are welcome!

- [Open an Issue](https://github.com/sribala333/autocomplete/issues/new)
- [View Existing Issues](https://github.com/sribala333/autocomplete/issues)

---

## Support

If you found this package useful, give it a star on [GitHub](https://github.com/sribala333/autocomplete) and share it with others.

You can also support via UPI: **sribala333@ybl**

---

## License

ISC © [Sriram M P](mailto:sribala333@gmail.com)