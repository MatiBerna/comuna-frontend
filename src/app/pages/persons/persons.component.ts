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
import { PersonsService } from './../../services/persons/persons.service';
import { MaterialModule } from 'src/app/material.module';

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
  constructor(public personsService: PersonsService) {}
  persons: Person[] = [];
  message: string = '';
  columnsToDisplay: string[] = ['firstName', 'lastName', 'dni'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedPerson: Person | null = null;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  ngOnInit() {
    this.personsService.getAll().subscribe((res: Response) => {
      this.persons = res.data;
      this.message = res.message;
    });
  }
}
