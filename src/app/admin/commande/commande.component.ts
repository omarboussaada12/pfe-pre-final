import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isEmpty } from 'rxjs';
import { Commande } from 'src/app/_model/Commande';
import { CommandeService } from 'src/app/_services/commande.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {
  content?: string;
  commandes? :any = [Commande];
  isadmin:boolean = false;
  currentUser: any;
  show:boolean=false;
  page: number =1;
  count: number = 0 ;
  tableSize: number = 10;
  tableSizes: any = [5, 10, 15, 20];

  constructor(
    private userService: UserService,
    private token: TokenStorageService,
    private commandeService : CommandeService,
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
        this.fetchcommandeA();
       }else
       {
       this.fetchcommandeU(currentUser.username);

       }
       this.count = Math.ceil(this.commandes.length / this.tableSize);
      },
      err => {
        this.content = JSON.parse(err.error).message;
        this.show=false;
        this.router.navigate(['landing'])
      }
      
    );
   
    
  }
  fetchcommandeA() {
    return this.commandeService.getCommandesadmin().subscribe((res: {}) => {
      this.commandes = res;
    
     
    });
  }
  fetchcommandeU(username : String) {
    return this.commandeService.getCommandesuser(username).subscribe((res: {}) => {
      this.commandes = res;
     
    });
  }
  editcommande(id:any)
  {
    this.router.navigate(['user/commande/update',id])
  }
  deletecommande(id:any)
  {
    this.commandeService.deleteCommande(id).subscribe((commandes:{})=>{
      location.reload();
    });
  }
  confirmercommande(id:any)
  {
    
    this.router.navigate(['admin/commande/detail',id]);
  }
  
  addcommande()
  {
    this.router.navigate(['user/commande/add']);
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.commandes();
   }
   onTableSizechange(event: any): void {
     this.tableSize - event.target.value;
     this.page = 1;
    this.commandes();
   }

}
