import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Response } from './../../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class PersonsService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Response>('http://localhost:3000/api/person');
  }
}
