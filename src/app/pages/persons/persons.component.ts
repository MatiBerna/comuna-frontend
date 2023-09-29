import { Component, inject } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { PersonComponent } from './../../components/person/person.component';

import { Person } from './../../models/person.model';
import { Response } from './../../models/response.model';
import { CommonModule } from '@angular/common';
import { PersonsService } from 'src/app/services/persons/persons.service';
import { MaterialModule } from 'src/app/material.module';
import { MatDialog } from '@angular/material/dialog';

@Component({
  standalone: true,
  imports: [
    PersonComponent,
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css'],
})
export class PersonsComponent {
  constructor(
    public personsService: PersonsService,
    public dialog: MatDialog
  ) {}
  persons: Person[] = [];
  message: string = '';
  columnsToDisplay: string[] = ['firstName', 'lastName', 'dni'];
  columnsToDisplayWithEdit = [...this.columnsToDisplay, 'edit'];
  selectedPerson: Person = {
    id: '',
    dni: '',
    firstName: '',
    lastName: '',
    phone: undefined,
    email: '',
    birthdate: new Date(),
  };

  getAllPersons() {
    this.personsService.getAll().subscribe((res: Response) => {
      this.persons = res.data;
      this.message = res.message;
    });
  }

  ngOnInit() {
    this.getAllPersons();
  }

  openEditPerson(person?: Person) {
    if (person) {
      this.selectedPerson = person;
    } else {
      this.selectedPerson = {
        id: '',
        dni: '',
        firstName: '',
        lastName: '',
        phone: undefined,
        email: '',
        birthdate: new Date(),
      };
    }

    const dialogRef = this.dialog.open(PersonComponent, {
      data: this.selectedPerson,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.personsService.addOrEdit(result).subscribe((res: Response) => {
          this.getAllPersons();
        });
      }
    });
  }

  deletePerson(person: Person) {
    this.personsService.delete(person).subscribe((res) => {
      console.log(res);
      this.getAllPersons();
    });
  }
}
