import { CommonModule } from '@angular/common';
import { Component, Input, Inject } from '@angular/core';
import { Person } from './../../models/person.model';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
})
export class PersonComponent {
  // @Input() person!: Person;
  constructor(
    public dialogRef: MatDialogRef<PersonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Person
  ) {}

  selectedPerson = JSON.parse(JSON.stringify(this.data));

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-ZñÑá-úÁ-Ú]*$'),
  ]);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
