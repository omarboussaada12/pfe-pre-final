import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  content?: string;
  username:String ="";
  currentUser: any;
  show:boolean=false;
  Users :any =[] ;

  constructor(private userService: UserService,
    private token: TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {
 
    this.userService.getAdminBoard().subscribe(
      data => {
       this.content = data;
       this.show=true;
       this.fetchUsers();
      },
      err => {
        this.content = JSON.parse(err.error).message;
        this.show=false;
        this.router.navigate(['/landing'])
      }
    );
  }
  fetchUsers() {
    return this.userService.getUsers().subscribe((res: {}) => {
      this.Users = res;
    });
  }
  adduser(){
    this.router.navigate(['/admin/user/add'])
  }
  update(username: any){
    this.router.navigate(['admin/user/edit/',username]);
  }
  Delete(username: any){
    return this.userService.deleteUser(username).subscribe((res: {}) => {
      window.location.reload();
    });
   
  }
}
