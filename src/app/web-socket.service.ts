import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { BehaviorSubject, Observable, catchError, retry, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class WebSocketService {
  private stompClient: Stomp.Client;
  private UsersNotificationSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private PrivateNotificationSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private AdminsNotificationSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private httpClient: HttpClient) {

  }
  endpoint = 'https://broken-birth-production.up.railway.app';
  public frame: any;
  getNotification(username: any): Observable<any> {
    return this.httpClient
      .get<any>(this.endpoint + '/getnotication/' + username)
      .pipe(retry(1), catchError(this.processError));
  }
  public Userchannel(username): void {
    const socket = new SockJS(this.endpoint + '/ws');
    this.stompClient = Stomp.over(socket);
    var headers = { 'Authorization': '' };
    this.stompClient.connect(headers, (frame) => {
      this.stompClient.subscribe('/users/messages', (message) => {
        this.UsersNotificationSubject.next(JSON.parse(message.body));
      });
    });
  }
  public Privatechannel(username): void {
    const privateSocket = new SockJS(this.endpoint + '/ws');
    this.stompClient = Stomp.over(privateSocket);
    var headers = { 'Authorization': '' };
    console.log(headers)
    this.stompClient.connect(headers, (frame) => {
      this.stompClient.subscribe('/specific/' + username, (message) => {
        this.PrivateNotificationSubject.next(JSON.parse(message.body));
      });
    });
  }
  public Adminchannel(username): void {
    const socket = new SockJS(this.endpoint + '/ws');
    this.stompClient = Stomp.over(socket);
    var headers = { 'Authorization': '' };
    this.stompClient.connect(headers, (frame) => {
      this.stompClient.subscribe('/admins/messages', (message) => {
        this.AdminsNotificationSubject.next(JSON.parse(message.body));
      });
    });
  }
  public sendNotificationUsers(text: string): void {
    this.stompClient.send('/app/UsersNotif', {}, JSON.stringify({ text: text }));
  }
  public sendNotificationAdmins(text: string): void {
    this.stompClient.send('/app/AdminsNotif', {}, JSON.stringify({ text: text }));
  }

  public sendPrivateNotification(username: string, text: string, to: string): void {
    var message = {
      text: text + username,
      to: to
    };
    this.stompClient.send('/app/private/' + username, {}, JSON.stringify(message));
  }

  public getUsersNotification(): Observable<any> {
    return this.UsersNotificationSubject.asObservable();
  }

  public getPrivateNotification(): Observable<any> {
    return this.PrivateNotificationSubject.asObservable();
  }

  public getAdminsNotification(): Observable<any> {
    return this.AdminsNotificationSubject.asObservable();
  }
  public disconnect(): void {
    if (this.stompClient) {
      this.stompClient.disconnect(() => {
        this.stompClient.ws.close();
        this.UsersNotificationSubject.next(null);
        this.PrivateNotificationSubject.next(null);
        this.AdminsNotificationSubject.next(null);
      });
    }
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
