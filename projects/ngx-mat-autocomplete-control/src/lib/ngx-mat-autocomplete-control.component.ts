import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
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
  @Input() appearance: any = 'outline';
  @Input() options: any[] = [];
  @Input() required = false;
  @Input() showDefaultSelect = false;
  @Input() disabled = false;
  @Input() checkValid = true;
  @Output() selectionChange = new EventEmitter<any>();
  keyUp = false;
  filterList: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (+this.control.value > 0) {
        const prevValue = this.control.value;
        this.setItems('');
        setTimeout(() => this.control.setValue(prevValue), 0);
      }
    }
    if (changes.disabled?.currentValue) {
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
    }
    this.keyUp = !!value;
    return true;
  }

  get displayDataFn() {
    return (data: any) => {
      if (data == null || data === '') {
        return null;
      }
      if (!this.filterList?.length) {
        return null;
      }
      const match = this.options.find((x) => x[this.refId] === data);
      return match ? match[this.refName] : null;
    };
  }

  setItems(value: any) {
    if (!value) {
      this.filterList = [...this.options];
    } else {
      const search = value.toLowerCase();
      this.filterList = this.options.filter(
        (item: any) => item[this.refName].toLowerCase().includes(search)
      );
    }
  }

  checkValidValue() {
    const value = this.control.value;
    if (value !== '' && value != null) {
      this.control.setErrors(this.keyUp ? { incorrect: true } : null);
    }
  }

  checVal(value: any) {
    if (this.showDefaultSelect === false && this.options) {
      const match = this.options.find(
        (e: any) =>
          e[this.refName].toLowerCase().trim() === value.toLowerCase().trim()
      );
      if (match) {
        this.control.setValue(match[this.refId]);
        this.keyUp = false;
      }
      this.checkValidValue();
    }
  }

  emitValues(event: any) {
    this.selectionChange.emit({
      control: this.control,
      value: event.option.value,
      data: this.options.find((x) => x[this.refId] === event.option.value)
    });

  }
}
