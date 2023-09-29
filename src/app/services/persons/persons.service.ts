import { Injectable } from '@angular/core';
import { Person } from 'src/app/models/person.model';

import { HttpClient } from '@angular/common/http';
import { Response } from './../../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class PersonsService {
  constructor(private http: HttpClient) {}

  //buscar paquete observable from rxjs
  getAll() {
    return this.http.get<Response>('http://localhost:3000/api/person');
  }

  addOrEdit(person: Person) {
    if (person.id) {
      return this.http.patch<Response>(
        `http://localhost:3000/api/person/${person.id}`,
        person
      );
    } else {
      return this.http.post<Response>(
        'http://localhost:3000/api/person',
        person
      );
    }
  }

  delete(person: Person) {
    return this.http.delete<Response>(
      `http://localhost:3000/api/person/${person.id}`
    );
  }
}
