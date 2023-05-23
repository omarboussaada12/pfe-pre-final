
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketService } from '../web-socket.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
    currentUser: any; 
    user :any = { username :'' , firstname :'' , lastname :'' , phone :'' ,address :'' , email :'', image :'' } 
    content?: string;
  messages: any;
    constructor(private token: TokenStorageService ,
      private userService : UserService,
      private router: Router,
      private webSocketService: WebSocketService) { }
  
    ngOnInit(): void {
        this.userService.getUserBoard().subscribe(
            data => {
              this.content = data;
              this.currentUser = this.token.getUser();
              this.fetchoneuser(this.currentUser.username)
            },
            err => {
              this.content = JSON.parse(err.error).message;
              this.router.navigate(['landing'])
            }
          );
      
       
    }
    
    fetchoneuser(username : any) {
      return this.userService.getSingleUser(username).subscribe((res: {}) => {
        this.user = res;
      });
    }
    editprofile()
    {
      this.router.navigate(['user-profile/edit']);
    }
    editimage()
    {
      this.router.navigate(['user-profile/image']);
    }
}
