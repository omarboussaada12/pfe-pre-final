import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Offer } from 'src/app/_model/Offer';
import { CommandeService } from 'src/app/_services/commande.service';
import { OfferService } from 'src/app/_services/offer.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  form: any = {
    offername :"",
    nbrunit: "",
    region: "",
    datec :Date
  };
  currentUser: any; 
  content?: string;
  show:boolean=false;
  offers? :any = [Offer];
  changeoffer(e:any){
    console.log(e.target.value)
    this.form.offername = e.target.value;
  }
  constructor(private userService: UserService,
    private offerService: OfferService,
    private commandeService: CommandeService,
    private router: Router,
    private token: TokenStorageService) { }

  ngOnInit(): void {
    this.userService.getUserBoard().subscribe(
      data => {
        this.content = data;
        this.show=true;
        this.fetchlistoffername();
      },
      err => {
        this.content = JSON.parse(err.error).message;
        this.show=false;
        this.router.navigate(['/login'])
        
      }
    );
  }
  fetchlistoffername() {
    return this.offerService.getOffers().subscribe((data:any ) => {
      this.offers = data;
    });
  }
 
  onSubmit(){
    this.currentUser = this.token.getUser();
    const { offername,nbrunit,region ,datec} = this.form;
    const cq: Commandereq = new Commandereq();
    cq.offername = offername;
    cq.username =this.currentUser.username;
    cq.nbrunit =nbrunit ;
    cq.region =region;
    cq.datec = datec;
    console.log(cq);
    this.commandeService.addCommande(cq).subscribe(
      data => {
        console.log(data);
      },
      err => {
        
      }
    );
  }
}
export class Commandereq {
  id?: number;
  offername?: string;
  username?: string;
  region?: string;
  nbrunit?: number;
  datec: any;
}


