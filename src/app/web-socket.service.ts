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
  private allMessagesSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private specificMessagesSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() { }

  public frame:any;
  public connect(username ,token): void {
    const socket = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(socket);
    var headers = {'Authorization': 'Bearer ' + token};
    this.stompClient.connect(headers, (frame) => {
      console.info('Connected: to ' + frame.getUser);
      this.stompClient.subscribe('/all/messages', (message) => {
        this.allMessagesSubject.next(JSON.parse(message.body));
      });
    });

    const privateSocket = new SockJS('http://localhost:8080/ws');
    this.privateStompClient = Stomp.over(privateSocket);

    var headers = {'Authorization': 'Bearer ' + token};
    console.log(headers)
    this.privateStompClient.connect(headers, (frame) => {
      console.log('Connected: ' + frame);
      this.privateStompClient.subscribe('/specific/'+username, (message) => {
        this.specificMessagesSubject.next(JSON.parse(message.body));
      });
    });
  }

  public sendMessage(text: string): void {
    this.stompClient.send('/app/application', {}, JSON.stringify({ text: text }));
  }

  public sendPrivateMessage(username:string ,text: string, to: string): void {
    var message = {
      text: text+username,
      to: to
  };
    this.stompClient.send('/app/private/'+username, {}, JSON.stringify(message));
  }

  public getAllMessages(): Observable<any> {
    return this.allMessagesSubject.asObservable();
  }

  public getSpecificMessages(): Observable<any> {
    return this.specificMessagesSubject.asObservable();
  }
}
