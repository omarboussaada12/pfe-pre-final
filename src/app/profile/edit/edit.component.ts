import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { userP, UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditPComponent implements OnInit {
  currentUser: any; 
  user :any = { username :'' , firstname :'' , lastname :'' , phone :'' ,address :'' , email :'', image :'' } 
  content?: string;
  isSuccessful = false;
  isUpFailed = false;
  errorMessage = '';
  constructor(private token: TokenStorageService ,
    private userService : UserService,
    private router: Router) { }

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
    this.router.navigate(['user-profile/updateimage']);
  }
  onSubmit(): void {
    const up: userP = new userP();
    up.firstname = this.user.firstname ;
    up.lastname = this.user.lastname ;
    up.email = this.user.email ;
    up.phone = this.user.phone;
    up.address = this.user.address ;
    up.role = this.user.roles[0].name ; 
    
    this.userService.updateUserinfo(this.currentUser.username,up).subscribe(
      data => {
        this.isSuccessful = true;
        this.isUpFailed = false;
        setTimeout(() => {
          this.router.navigate(['user-profile']);
        }, 2000);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isUpFailed = true;
        setTimeout(() => {
          this.isUpFailed = false;
        }, 3000);
      }
    );
  }
}