import { Component, inject } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';

import { PersonComponent } from './../../components/person/person.component';
import { Person } from './../../models/person.model';
import { Response } from './../../models/response.model';
import { CommonModule } from '@angular/common';
import { PersonsService } from 'src/app/services/persons/persons.service';
import { MaterialModule } from 'src/app/material.module';

@Component({
  standalone: true,
  imports: [PersonComponent, CommonModule, MaterialModule],
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
    _id: null,
    dni: null,
    firstName: null,
    lastName: null,
    phone: undefined,
    email: null,
    birthdate: null,
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

  openEditPerson(person?: Person, messageToSend?: string) {
    if (person) {
      this.selectedPerson = Object.assign({}, person);
    } else {
      this.selectedPerson = {
        _id: null,
        dni: null,
        firstName: null,
        lastName: null,
        phone: undefined,
        email: null,
        birthdate: null,
      };
    }

    const dialogRef = this.dialog.open(PersonComponent, {
      data: this.selectedPerson,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllPersons();
    });
  }

  deletePerson(person: Person) {
    this.personsService.delete(person).subscribe((res) => {
      console.log(res);
      this.getAllPersons();
    });
  }
}
