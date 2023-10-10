import { Injectable } from '@angular/core';
import { Person } from 'src/app/models/person.model';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from './../../models/response.model';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PersonsService {
  constructor(private http: HttpClient) {}

  //buscar paquete observable from rxjs
  getAll(): Observable<Response> {
    return this.http.get<Response>('http://localhost:3000/api/person');
  }

  addOrEdit(person: Person): Observable<Response> {
    if (person._id) {
      return this.http
        .patch<Response>(
          `http://localhost:3000/api/person/${person._id}`,
          person
        )
        .pipe(catchError(this.handleError));
    } else {
      return this.http
        .post<Response>('http://localhost:3000/api/person', person)
        .pipe(catchError(this.handleError));
    }
  }

  delete(person: Person) {
    return this.http.delete<Response>(
      `http://localhost:3000/api/person/${person._id}`
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.error.message));
  }
}
