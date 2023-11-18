import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, catchError, throwError } from 'rxjs';
import { Commande } from '../_model/Commande';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  endpoint = 'broken-birth-production.up.railway.app';
  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  getallreclamation(): Observable<any> {
    return this.httpClient
      .get<any>(this.endpoint + '/get-all-reclamation')
      .pipe(retry(1), catchError(this.processError));
  }
  getreclamationuser(username: any): Observable<any> {
    return this.httpClient
      .get<any>(this.endpoint + '/get-reclamation-byuser/' + username)
      .pipe(retry(1), catchError(this.processError));
  }
  getSinglereclamtion(id: any): Observable<any> {
    return this.httpClient
      .get<any>(this.endpoint + '/get-reclamation/' + id)
      .pipe(retry(1), catchError(this.processError));
  }
  addReclamation(data: any): Observable<any> {
    return this.httpClient
      .post<any>(
        this.endpoint + '/add-reclamation',
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }
  deleteCommande(id: any) {
    return this.httpClient
      .delete<Commande>(this.endpoint + '/delete-Commande/' + id, this.httpHeader)
      .pipe(retry(1), catchError(this.processError));
  }
  processreclamation(id: any, reponse: string) {
    const url = `${this.endpoint}/ReclamationProcessing/${id}`;
    const body = reponse;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.put<any>(url, body, httpOptions).pipe(
      retry(1),
      catchError(this.processError)
    );
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
export class Commandereq {
  id?: number;
  offername?: string;
  username?: string;
  region?: string;
  nbrunit?: number;
  datec?: Date;
}

