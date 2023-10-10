import { CommonModule } from '@angular/common';
import { Component, Input, Inject } from '@angular/core';
import { Person } from './../../models/person.model';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
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
import { Response } from 'src/app/models/response.model';
import { PersonsService } from 'src/app/services/persons/persons.service';

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
  constructor(
    public dialogRef: MatDialogRef<PersonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Person,
    public personService: PersonsService
  ) {}

  selectedPerson = Object.assign({}, this.data);
  message: string = '';

  dni = new FormControl(this.data.dni, [
    Validators.required,
    Validators.pattern('^[0-9]+$'),
    Validators.minLength(7),
  ]);

  firstName = new FormControl(this.data.firstName, [
    Validators.required,
    Validators.pattern('^[a-zA-ZñÑá-úÁ-Ú]*$'),
  ]);

  lastName = new FormControl(this.data.lastName, [
    Validators.required,
    Validators.pattern('^[a-zA-ZñÑá-úÁ-Ú]*$'),
  ]);

  email = new FormControl(this.data.email, [
    Validators.required,
    Validators.email,
  ]);

  phone = new FormControl(this.data.phone, [Validators.pattern('^[0-9]+$')]);

  birthdate = new FormControl(this.data.birthdate, [Validators.required]);

  dataValidation() {
    if (
      this.dni.status === 'VALID' &&
      this.firstName.status === 'VALID' &&
      this.lastName.status === 'VALID' &&
      this.email.status === 'VALID' &&
      this.phone.status === 'VALID' &&
      this.birthdate.status === 'VALID'
    ) {
      return false;
    }
    return true;
  }

  sendNewPerson() {
    const newPerson = new Person(
      this.data._id,
      this.dni.value,
      this.firstName.value,
      this.lastName.value,
      this.phone.value,
      this.email.value,
      this.birthdate.value
    );

    try {
      this.personService.addOrEdit(newPerson).subscribe({
        next: (res: Response) => {
          this.message = res.message;
          console.log(this.message);
          console.log(JSON.stringify(this.data));
          this.dialogRef.close();
        },
        error: (message) => {
          this.message = message.message;
          console.log(`Error: ${message.message}`);
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
