import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { timeStamp } from 'console';
import { WebSocketService } from 'src/app/web-socket.service';
import { delay } from 'rxjs';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    public isCollapsed = true;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    messages: string[] = [] ;
   
    title(title: any) {
        throw new Error('Method not implemented.');
      }
      private roles: string[] = [];
      isLoggedIn = false;
      showAdminBoard = false;
      showuserBoard = false;
      showModeratorBoard = false;
      username?: string;
      nonotification =true ;

    constructor(public location: Location,
         private router: Router ,
         private tokenStorageService: TokenStorageService,
         private webSocketService: WebSocketService) {
    }
    
    ngOnInit() {
        
        this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const token = this.tokenStorageService.getToken();
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showuserBoard = this.roles.includes('ROLE_USER');
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_CLIENT');
      this.username = user.username;
    console.log(token)
    console.log(this.username)
      this.webSocketService.connect(this.username,token );
      this.webSocketService.getAllMessages().subscribe((message) => {
        this.messages.push(message.text);
        console.log(message);
      });
      this.webSocketService.getSpecificMessages().subscribe((message) => {
        this.messages.push(message.text);
        console.log(message);
      });
     
    }
   
  
      this.router.events.subscribe((event) => {
        this.isCollapsed = true;
        if (event instanceof NavigationStart) {
           if (event.url != this.lastPoppedUrl)
               this.yScrollStack.push(window.scrollY);
       } else if (event instanceof NavigationEnd) {
           if (event.url == this.lastPoppedUrl) {
               this.lastPoppedUrl = undefined;
               window.scrollTo(0, this.yScrollStack.pop());
           } else
               window.scrollTo(0, 0);
       }
     });
     this.location.subscribe((ev:PopStateEvent) => {
         this.lastPoppedUrl = ev.url;
     });
    }
    logout(): void {
        this.tokenStorageService.signOut();
        this.isLoggedIn = !!this.tokenStorageService.getToken();
        window.location.reload();
      }

    isHome() {
        var titlee = this.location.prepareExternalUrl(this.location.path());

        if( titlee === '#/home' ) {
            return true;
        }
        else {
            return false;
        }
    }
    isDocumentation() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if( titlee === '#/documentation' ) {
            return true;
        }
        else {
            return false;
        }
    }
}
