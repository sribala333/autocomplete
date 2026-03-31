import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import {  UntypedFormControl } from '@angular/forms'; 
@Component({
  selector: 'ngx-mat-autocomplete-control',
  standalone: false,
  templateUrl: './autocomplete.html',
  styleUrls: ['./autocomplete.css']
})
export class NgxMatAutocompleteControlComponent implements OnInit, OnChanges {
  @Input() control!: UntypedFormControl;
  @Input() refId: string = '';
  @Input() refName: string = '';
  @Input() label: string = '';
  @Input() highlightColor: string = 'black';

  @Input() appearance: any = 'outline' 
    //|| 'standard' || 'fill' || 'legacy';
  @Input() options: any[] = [];
  @Input() required = false;
  @Input() showDefaultSelect = false;
  @Input() disabled = false;
  @Input() value: any;
  @Input() checkValid = true;
  @Output() selectionChange = new EventEmitter<any>();
  @Output() propValueEvent = new EventEmitter<any>();
  keyUp = false;
  filterList = [];
  tempValue: any;
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (+this.control.value > 0) {
        this.tempValue = this.control.value;
        this.setItems('');
        setTimeout(() => {
          this.control.setValue(this.tempValue);
        }, 0);
      }
    }
    if (changes.disabled && changes.disabled.currentValue) {
      this.control.disable();
    } else {
      this.disabled = false;
      this.control.enable();
    }
  }
  ngOnInit() {
    if (this.options) {
      this.setItems('');
    }
  }
  keyUpFunction(event: any, value: any) {
    if (event.key === 'Enter' || event.key === 'Tab') {
      event.preventDefault();
      return false;
    } else {
      if (value) {
        const data = this.filterList.filter(
          (e: any) => e[this.refName].toLowerCase() === value.toLowerCase()
        );
        if (data.length > 0) {
          this.keyUp = true;
        } else {
          this.keyUp = true;
        }
      } else {
        this.keyUp = false;
      }
      this.propValueEvent.emit({
        propertyName: this.control,
        value: value
      });
      return true;
    }
  }
  get displayDataFn() {
    const dataNew = (data: any) => {
      if (data == null || data === undefined || data === '') {
        return null;
      } else {
        if (this.filterList && this.filterList.length > 0) {
          data = this.options.find((x) => x[this.refId] === data);
          if (data) {
            return data[this.refName];
          } else {
            return null;
          }
        } else {
          return null;
        }
      }
    };
    return dataNew;
  }
  // Resource ..
  setItems(value: any) {
    if (!value) {
      this.assignResourceCopy();
    }
    if (value) {
      this.filterList = Object.assign([], this.options).filter(
        (item: any) =>
          item[this.refName].toLowerCase().indexOf(value.toLowerCase()) > -1
      );
    }
  }
  assignResourceCopy() {
    this.filterList = Object.assign([], this.options);
  }

  checkValidValue() {
    const value = this.control.value;
    if (value === '' || value == null) {
    } else if (this.keyUp) {
      this.control.setErrors({ incorrect: true });
    } else {
      this.control.setErrors(null);
    }
  }

  checVal(value: any) {
    if (this.showDefaultSelect === false && this.options) {
      const data: any = this.options.filter(
        (e: any) =>
          e[this.refName].toLowerCase().trim() === value.toLowerCase().trim()
      );
      if (data.length > 0) {
        const datax = data[0];
        this.control.setValue(datax[this.refId]);
        this.keyUp = false;
      }
      this.checkValidValue();
    }
  }
  emitValues(event: any) {
    this.selectionChange.emit(event.option.value);
    this.propValueEvent.emit({
      propertyName: this.control,
      value: event.option.value
    });
  }
  trackByFn(index: number, item: any) {
    return index;
  }
}
