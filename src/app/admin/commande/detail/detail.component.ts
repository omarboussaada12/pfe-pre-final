import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandeService } from 'src/app/_services/commande.service';
import { OfferService } from 'src/app/_services/offer.service';
import { UserService } from 'src/app/_services/user.service';
import { WebSocketService } from 'src/app/web-socket.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  form: any = {
    offername: "",
    nbrunit: null,
    region: "",
    datec: '',
    status: ''
  };

  commande: any;
  offers: any;
  isselected: "waiting for confirmation";
  isSuccessful: boolean;
  errorMessage: any;
  
  changestatus(e: any) {
    console.log(e.target.value)
    this.form.status = e.target.value;
  }
  currentUser: any;
  content?: string;
  user :any = { username :'' , firstname :'' , lastname :'' , phone :'' ,address :'' , email :'', image :'' } 
  constructor(private commandeService: CommandeService,
    private router: Router,
    private route: ActivatedRoute,
    private webSocketService: WebSocketService,
    private offerService: OfferService,
    private userService: UserService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data
        this.getcommandebyid()
        
      },
      err => {
        this.content = JSON.parse(err.error).message;
        this.router.navigate(['landing'])
      }
    );
    
  }
  getcommandebyid() {
    this.commandeService.getSingleCommande(+this.route.snapshot.params['id']).subscribe((res: {}) => {
      this.commande = res;
      this.isselected = this.commande.offername;
      this.form.offername = this.commande.offername;
      this.form.region = this.commande.region;
      this.form.nbrunit = this.commande.nbrunit;
      let formatedDate = this.datePipe.transform(this.commande.date, 'yyyy-MM-dd')
      this.commande.date = formatedDate;
      //converstion date to formate
      let formatedDatec = this.datePipe.transform(this.commande.datec, 'yyyy-MM-dd')
      this.commande.datec = formatedDatec;
      this.form.status = this.commande.status;
      this.fetchoneuser(this.commande.username);

    });

  }
  fetchoneuser(username : any) {
    return this.userService.getSingleUser(username).subscribe((res: {}) => {
      this.user = res;
      console.log(this.user)
    });
  }
  onsubmite() {
    console.log(this.form.status);
    if (confirm("Are you sure to  " + this.form.status + " this commande")) {
      if (this.form.status === "confimer") {
        this.commandeService.validerCommande(+this.route.snapshot.params['id']).subscribe(
          data => {
            this.webSocketService.sendPrivateNotification(this.commande.username, " your order have been processed ", this.commande.username);
            this.router.navigate(['admin/commande'])
          },
          err => {
            this.errorMessage = err.error.message;
            console.log('errorMessage')
          }
        );

      }
      if (this.form.status === "refuser") {
        this.commandeService.refuserCommande(+this.route.snapshot.params['id']).subscribe(
          data => {
            this.webSocketService.sendPrivateNotification(this.commande.username, " your order have been processed ", this.commande.username);
            this.router.navigate(['admin/commande'])
          },
          err => {
            this.errorMessage = err.error.message;
            console.log('errorMessage')
          }
        );
      }
    }
  }
}