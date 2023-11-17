import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Offer } from 'src/app/_model/Offer';
import { OfferService } from 'src/app/_services/offer.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {
  offers :any =[] ;
  users? :any ;
  content :string ;
  page: number =1;
  count: number = 0 ;
  tableSize: number = 3;
  tableSizes: any = [5, 10, 15, 20];
  constructor(private offerService: OfferService  ,private userService: UserService , private router: Router) {}

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
       this.fetchlistoffer();
       this.count = Math.ceil(this.offers.length / this.tableSize);
      
      },
      err => {
        this.content = JSON.parse(err.error).message;
        this.router.navigate(['/landing'])
      }
    );
    
  }

  fetchlistoffer() {
    return this.offerService.getOffers().subscribe((res: {}) => {
      this.offers = res;
      
      
    });
  }
  addservice()
  {
    this.router.navigate(['admin/service/add'])
  }
  update(id : any)
  {
    this.router.navigate(['admin/service/edit',id])
  }
  delete(id : any)
  {
  this.offerService.deleteOffer(id).subscribe((res: {}) => {
    location.reload();
    });
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.offers();
  }
  
  onTableSizechange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.offers();
  }
  }
