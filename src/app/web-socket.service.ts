import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WebSocketService {
  private stompClient: Stomp.Client;
  private privateStompClient: Stomp.Client;
  private UsersNotificationSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private PrivateNotificationSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private AdminsNotificationSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() {
    
   }

  public frame:any;
  public Userchannel(username ,token): void {
    const socket = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(socket);
    var headers = {'Authorization':''};
    this.stompClient.connect(headers, (frame) => {
      this.stompClient.subscribe('/users/messages', (message) => {
        this.UsersNotificationSubject.next(JSON.parse(message.body));
      });
    });
  }
  public Privatechannel(username ,token): void {
    const privateSocket = new SockJS('http://localhost:8080/ws');
    this.privateStompClient = Stomp.over(privateSocket);
   var headers = {'Authorization':'' };
    console.log(headers)
    this.privateStompClient.connect(headers, (frame) => {
      this.privateStompClient.subscribe('/specific/'+username, (message) => {
        this.PrivateNotificationSubject.next(JSON.parse(message.body));
      });
    });
  }
  public Adminchannel(username ,token): void {
    const socket = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(socket);
    var headers = {'Authorization':'' };
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

  public sendPrivateNotification(username:string ,text: string, to: string): void {
    var message = {
      text: text+username,
      to: to
  };
    this.stompClient.send('/app/private/'+username, {}, JSON.stringify(message));
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
}
