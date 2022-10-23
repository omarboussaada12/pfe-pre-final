import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommandeService } from 'src/app/_services/commande.service';
import { OfferService } from 'src/app/_services/offer.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  form: any = {
    offername :"",
    nbrunit: "",
    region: ""
  };
  commande: any;
  offers :any;
  isselected = false;
  changeoffer(e:any){
    console.log(e.target.value)
    this.form.offername = e.target.value;
  }
  constructor(private commandeService: CommandeService,
    private router: Router,
    private route: ActivatedRoute,
    private offerService: OfferService,) { }

  ngOnInit(): void {
    this.getcommandebyid();
    this.fetchlistoffername();
    if(this.offers.name === this.commande.offername)
    {
      const isselected =true;
    }
  }
  getcommandebyid() {
    this.commandeService.getSingleCommande(+this.route.snapshot.params['id']).subscribe((res: {}) => {
      this.commande = res;
      console.log(this.commande);
    });
  }
  fetchlistoffername() {
    return this.offerService.getOffers().subscribe((data:any ) => {
      this.offers = data;
    });
  }
}
