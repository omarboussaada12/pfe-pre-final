import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Commande } from 'src/app/_model/Commande';
import { CommandeService } from 'src/app/_services/commande.service';
import { OfferService } from 'src/app/_services/offer.service';
import { isDate } from 'util/types';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  form: any = {
    offername :"",
    nbrunit: null,
    region: "",
    datec :''
  };
  commande: any;
  offers :any;
  isselected :any;
  isSuccessful: boolean;
  errorMessage: any;
  changeoffer(e:any){
    console.log(e.target.value)
    this.form.offername = e.target.value;
  }
  constructor(private commandeService: CommandeService,
    private router: Router,
    private route: ActivatedRoute,
    private offerService: OfferService,
    private datePipe: DatePipe,) {
     }

  ngOnInit(): void {
    this.getcommandebyid();
    this.fetchlistoffername();
    
  }
  getcommandebyid() {
    this.commandeService.getSingleCommande(+this.route.snapshot.params['id']).subscribe((res: {}) => {
      this.commande = res;
      this.isselected=this.commande.offername;
      this.form.offername = this.commande.offername;
      this.form.region = this.commande.region;
      this.form.nbrunit = this.commande.nbrunit;
      //converstion date to formate
      let formatedDate = this.datePipe.transform(this.commande.datec, 'yyyy-MM-dd')
      console.log(formatedDate); 
      this.form.datec  =formatedDate ;
      this.form.status = this.commande.status;
     
    });
  }
  fetchlistoffername() {
    return this.offerService.getOffers().subscribe((data:any ) => {
      this.offers = data;
    });
  }
  onSubmit()
  {
    console.log(this.form);
    this.commandeService.updateCommande(+this.route.snapshot.params['id'],this.form).subscribe(
      data => {
        this.isSuccessful = true;
        console.log('done')
      },
      err => {
        this.errorMessage = err.error.message;
        console.log('errorMessage')
      });
    }
}