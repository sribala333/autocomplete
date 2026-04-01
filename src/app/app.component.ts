import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'mat-ta-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Auto Complete';
  userForm!: FormGroup;
  selectedValue: any = null;
  selectedData: any = null;
  isDisabled = false;

  userList = [
    { userId: 1, userName: 'Sriram M P' },
    { userId: 2, userName: 'Sribala' },
    { userId: 3, userName: 'Balamurugan' },
    { userId: 4, userName: 'Subashini' },
    { userId: 5, userName: 'Narmatha' },
    { userId: 6, userName: 'Priya' },
    { userId: 7, userName: 'Karthik' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      userId: ['', Validators.required]
    });
  }

  onSelectionChange(event: { value: any; data: any }): void {
    this.selectedValue = event.value;
    this.selectedData = event.data;
  }

  toggleDisabled(): void {
    this.isDisabled = !this.isDisabled;
  }

  reset(): void {
    this.userForm.reset();
    this.selectedValue = null;
    this.selectedData = null;
  }
}
