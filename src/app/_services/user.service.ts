import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { User } from '../_model/User';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  endpoint = 'https://broken-birth-production.up.railway.app';
  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
// for test 
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

// api user 
  getUsers(): Observable<User> {
    return this.httpClient
      .get<User>(this.endpoint + '/get-all-users')
      .pipe(retry(1), catchError(this.processError));
  }
  getUsersAdmin(): Observable<User> {
    return this.httpClient
      .get<User>(this.endpoint + '/get-user-admin')
      .pipe(retry(1), catchError(this.processError));
  }
  getSingleUser(username: any): Observable<any> {
    return this.httpClient
      .get<any>(this.endpoint + '/get-user/' + username)
      .pipe(retry(1), catchError(this.processError));
  }
 
  updateUserimage(username: any, file: File):Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('PUT', `${this.endpoint}/update-user-image/`+ username, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.httpClient.request(req);
  }

  updateUserinfo(username: any, data : any): Observable<any> {  
    return this.httpClient.put<userP>( this.endpoint + '/update-user-info/' + username, JSON.stringify(data),this.httpHeader);
  }
  /*change function in the backend*/
  deleteUser(username: any) {
    return this.httpClient
      .delete<User>(this.endpoint + '/delete-user/' + username, this.httpHeader)
      .pipe(retry(1), catchError(this.processError));
  }
  updateroleUser(username : any , role :any) {
    return this.httpClient
      .put<User>(this.endpoint + '/update-user-role/' + username +'/'+ role, this.httpHeader)
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
export class userP {
  firstname ?: string;
  lastname?: string;
  phone ?: String;
  address?: string;
  email?: string;
  role!: string;
}
