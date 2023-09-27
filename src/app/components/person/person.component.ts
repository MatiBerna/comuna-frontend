import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Person } from './../../models/person.model';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
})
export class PersonComponent {
  @Input() person!: Person;
}
