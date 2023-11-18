import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, Event as NavigationEvent } from '@angular/router';
import { Location ,PopStateEvent } from '@angular/common';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

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
  messages: String[] = [];
  isProfileDropdownOpen: boolean = false;

  title(title: any) {
    throw new Error('Method not implemented.');
  }
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showuserBoard = false;
  showClientBoard = false;
  username?: string;
  notificationcount = 0;
  showNotifications = false;
  
  constructor(public location: Location,
    private router: Router,
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
      this.showClientBoard = this.roles.includes('ROLE_CLIENT');
      this.username = user.username;
     
      if (this.showAdminBoard) {
        this.webSocketService.Adminchannel(this.username);
        this.webSocketService.getAdminsNotification().subscribe((message) => {
          if (message && message.text) {
            this.messages.unshift(message.text);
            this.notificationcount++;
          }
        });
      }
      if ((this.showClientBoard)||(this.showuserBoard)) {
        this.webSocketService.Userchannel(this.username);
        this.webSocketService.Privatechannel(this.username);
        this.webSocketService.getUsersNotification().subscribe((message) => {
          if (message && message.text) {
            this.messages.unshift(message.text);
            this.notificationcount++;
          }
        });
        this.webSocketService.getPrivateNotification().subscribe((message) => {
          if (message && message.text) {
            this.messages.unshift(message.text);
            this.notificationcount++;
          }
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
      this.location.subscribe((ev: PopStateEvent) => {
        this.lastPoppedUrl = ev.url;
      });
      this.StartNotification(this.username);
    }
  }
 
  StartNotification(username :any)
  {
    return this.webSocketService.getNotification(username).subscribe((message) => {
      this.messages = message.map(item => item.text);
    });
  }
  
  logout(): void {
    this.webSocketService.disconnect();
    this.tokenStorageService.signOut();
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    window.location.reload();
  }
  toggleNotifications() {
    if (this.showNotifications === false) {
      this.showNotifications = true

    } else {
      this.showNotifications = false
      this.notificationcount = 0
    }
  }
  isHome() {
    var titlee = this.location.prepareExternalUrl(this.location.path());

    if (titlee === '#/home') {
      return true;
    }
    else {
      return false;
    }
  }
  isDocumentation() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee === '#/documentation') {
      return true;
    }
    else {
      return false;
    }
  }
  toggleProfileDropdown() {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
  }
}
