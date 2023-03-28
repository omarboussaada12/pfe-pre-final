import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../web-socket.service';
import { Offer } from '../_model/Offer';
import { OfferService } from '../_services/offer.service';
import { UserService } from '../_services/user.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  focus: any;
  focus1: any;
  offers? :any ;
  users? :any ;

  constructor(private offerService: OfferService , private userService : UserService ) {}

  ngOnInit(): void {
    this.fetchlistoffer();
    this.fetchlistAdmin();
   
  }

  fetchlistoffer() {
    return this.offerService.getOffers().subscribe((res: {}) => {
      this.offers = res;
    });
  }
  fetchlistAdmin() {
    return this.userService.getUsersAdmin().subscribe((res: {}) => {
      this.users = res;
    });
  }
}