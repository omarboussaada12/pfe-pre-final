import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { User } from '../_model/User';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  endpoint = 'http://localhost:8080';
  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getPublicContent(): Observable<any> {
    return this.httpClient.get(this.endpoint + '/api/test/all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.httpClient.get(this.endpoint + '/api/test/user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.httpClient.get(this.endpoint + '/api/test/mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.httpClient.get(this.endpoint + '/api/test/admin', { responseType: 'text' });
  }
  getUsers(): Observable<User> {
    return this.httpClient
      .get<User>(this.endpoint + '/get-all-users')
      .pipe(retry(1), catchError(this.processError));
  }
  getSingleUser(username: any): Observable<any> {
    return this.httpClient
      .get<any>(this.endpoint + '/get-user/' + username)
      .pipe(retry(1), catchError(this.processError));
  }
  addUser(data: any): Observable<User> {
    return this.httpClient
      .post<User>(
        this.endpoint + '/add-Offer',
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }
  /*change function in the backend*/
  updateOffer(id: any, data: any): Observable<User> {
    return this.httpClient
      .put<User>(
        this.endpoint + '/update-offer' + id,
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }
  deleteOffer(id: any) {
    return this.httpClient
      .delete<User>(this.endpoint + '/delete-Offer/' + id, this.httpHeader)
      .pipe(retry(1), catchError(this.processError));
  }
  getUsersAdmin(): Observable<User> {
    return this.httpClient
      .get<User>(this.endpoint + '/get-user-admin')
      .pipe(retry(1), catchError(this.processError));
  }
  processError(err: any) {
    let message = '';
    if (err.error instanceof ErrorEvent) {
      message = err.error.message;
    } else {
      message = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    console.log(message);
    return throwError(() => {
      message;
    });
  }
}
