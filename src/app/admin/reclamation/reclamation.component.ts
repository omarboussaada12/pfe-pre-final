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
  page: number =1;
  count: number = 0 ;
  tableSize: number = 10;
  tableSizes: any = [5, 10, 15, 20];

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
      this.count = this.reclamtions.length/this.tableSize;
    });
  }
  fetchreclamationA() {
    return this.reclamtionService.getallreclamation().subscribe((res: {}) => {
      this.reclamtions = res;
      this.count = this.reclamtions.length/this.tableSize;
    });
  }
  addreclamation()
  {
    this.router.navigate(['reclamation/add']);
  }
  detailreclamation(id: any)
  {
    this.router.navigate(['reclamation/process',id]);
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.reclamtions();
   }
   onTableSizechange(event: any): void {
     this.tableSize - event.target.value;
     this.page = 1;
    this.reclamtions();
   }
}
