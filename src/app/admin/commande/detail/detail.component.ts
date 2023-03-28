import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandeService } from 'src/app/_services/commande.service';
import { OfferService } from 'src/app/_services/offer.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  form: any = {
    offername :"",
    nbrunit: null,
    region: "",
    datec :''
  };
 
  commande: any;
  offers :any;
  isselected :"waiting for confirmation";
  isSuccessful: boolean;
  errorMessage: any;
  status :any;
  changestatus(e:any){
    console.log(e.target.value)
   this.status = e.target.value;
  }
  constructor(private commandeService: CommandeService,
    private router: Router,
    private route: ActivatedRoute,
    private offerService: OfferService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getcommandebyid();
  }
  getcommandebyid() {
    this.commandeService.getSingleCommande(+this.route.snapshot.params['id']).subscribe((res: {}) => {
      this.commande = res;
      this.isselected=this.commande.offername;
      this.form.offername = this.commande.offername;
      this.form.region = this.commande.region;
      this.form.nbrunit = this.commande.nbrunit;
      let formatedDate = this.datePipe.transform(this.commande.date, 'yyyy-MM-dd')
      console.log(formatedDate); 
      this.commande.date  =formatedDate ;
      //converstion date to formate
      let formatedDatec = this.datePipe.transform(this.commande.datec, 'yyyy-MM-dd')
      console.log(formatedDatec); 
      this.commande.datec  =formatedDate ;
      this.form.status = this.commande.status;
     
    });

}
onsubmite()
{
  console.log(this.status);
  if(confirm("Are you sure to  "+this.status +" this commande"))
  {
    if (this.status === "confimer")
    {
      this.commandeService.validerCommande(+this.route.snapshot.params['id']).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['admin/commande'])
        },
        err => {
          this.errorMessage = err.error.message;
          console.log('errorMessage')
        }
      );
    
    }
    if (this.status === "refuser")
    {
      this.commandeService.refuserCommande(+this.route.snapshot.params['id']).subscribe(
        data => {
          console.log(data);
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