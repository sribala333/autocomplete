import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'mat-ta-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AutoComplete';
  userForm!: FormGroup;
  selectedUser: any = null;
  lastKeyup: any = null;

  userList = [
    { userId: 1, userName: 'Sriram M P' },
    { userId: 1, userName: 'Sribala' },
    { userId: 2, userName: 'Balamurugan' },
    { userId: 3, userName: 'Subashini' },
    { userId: 4, userName: 'Narmatha' },
    { userId: 5, userName: 'Priya' },
    { userId: 6, userName: 'Karthik' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      userId: ['', Validators.required]
    });
  }

  onSelectionChange(event: any): void {
    this.selectedUser = event;
  }

  onKeyup(event: any): void {
    this.lastKeyup = event.value;
  }
}
