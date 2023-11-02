import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Commande } from '../_model/Commande';


@Injectable({
  providedIn: 'root'
})

export class CommandeService {

  endpoint = 'http://localhost:8080';
  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  getCommandesadmin(): Observable<Commande> {
    return this.httpClient
      .get<Commande>(this.endpoint + '/get-all-commandes/')
      .pipe(retry(1), catchError(this.processError));
  }
  getCommandesuser(username: any): Observable<Commande> {
    return this.httpClient
      .get<Commande>(this.endpoint + '/get-all-commandesbyuser/' + username)
      .pipe(retry(1), catchError(this.processError));
  }
  getSingleCommande(id: any): Observable<Commande> {
    return this.httpClient
      .get<Commande>(this.endpoint + '/get-commande/' + id)
      .pipe(retry(1), catchError(this.processError));
  }
  addCommande(data: any): Observable<any> {
    return this.httpClient
      .post<Commandereq>(
        this.endpoint + '/add-commande',
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }
  /*change function in the backend*/
  updateCommande(id: any, data: any): Observable<Commande> {
    return this.httpClient
      .put<Commande>(
        this.endpoint + '/update-Commande/' + id,
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
  validerCommande(id: any) {
    return this.httpClient
      .put<Commande>(this.endpoint + '/valider-Commande/' + id, this.httpHeader)
      .pipe(retry(1), catchError(this.processError));
  }
  refuserCommande(id: any) {
    return this.httpClient
      .put<Commande>(this.endpoint + '/refuser-Commande/' + id, this.httpHeader)
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
export class Commandereq {
  id?: number;
  offername?: string;
  username?: string;
  region?: string;
  nbrunit?: number;
  datec?: Date;
}

