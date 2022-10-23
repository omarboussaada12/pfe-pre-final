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
  constructor(private offerService: OfferService  ,private userService: UserService , private router: Router) {}

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
       this.fetchlistoffer();
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
}