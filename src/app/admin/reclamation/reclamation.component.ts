import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReclamationService } from 'src/app/_services/reclamation.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit {

  content?: string;
  reclamtions? :any = [];
  isadmin:boolean = false;
  currentUser: any;
  show:boolean=false;

  constructor( private userService: UserService,
    private token: TokenStorageService,
    private reclamtionService : ReclamationService,
    private router: Router) { }

  ngOnInit(): void {
    const currentUser = this.token.getUser();
    this.userService.getModeratorBoard().subscribe(
      data => {
        this.content = data;
       this.show=true;
       if(currentUser.roles == 'ROLE_ADMIN')
       {
        this.isadmin=true;
        this.fetchreclamationA();
       }else
       {
       this.fetchreclamationU(currentUser.username);
       }
      },
      err => {
        this.content = JSON.parse(err.error).message;
        this.show=false;
        this.router.navigate(['landing'])
      }
    );
  }
  fetchreclamationU(username: any) {
    return this.reclamtionService.getreclamationuser(username).subscribe((res: {}) => {
      this.reclamtions = res;
    });
  }
  fetchreclamationA() {
    return this.reclamtionService.getallreclamation().subscribe((res: {}) => {
      this.reclamtions = res;
    });
  }
  addreclamation()
  {
    this.router.navigate(['user/commande/add']);
  }

}
