import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Offer } from 'src/app/_model/Offer';
import { CommandeService } from 'src/app/_services/commande.service';
import { OfferService } from 'src/app/_services/offer.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';
import { WebSocketService } from 'src/app/web-socket.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  form: any = {
    offername: "",
    nbrunit: "",
    region: "",
    datec: Date
  };
  currentUser: any;
  content?: string;
  show: boolean = false;
  alert: boolean = false;
  offers?: any = [Offer];
  changeoffer(e: any) {
    console.log(e.target.value)
    this.form.offername = e.target.value;
  }
  constructor(private userService: UserService,
    private offerService: OfferService,
    private commandeService: CommandeService,
    private router: Router,
    private webSocketService: WebSocketService,
    private token: TokenStorageService) { }

  ngOnInit(): void {
    this.userService.getUserBoard().subscribe(
      data => {
        this.content = data;
        this.show = true;
        this.fetchlistoffername();
      },
      err => {
        this.content = JSON.parse(err.error).message;
        this.show = false;
        this.router.navigate(['/login'])

      }
    );
  }
  fetchlistoffername() {
    return this.offerService.getOffers().subscribe((data: any) => {
      this.offers = data;
    });
  }

  onSubmit() {
    // Initialize validation flag
    let validation = false;

    // Get current user
    this.currentUser = this.token.getUser();

    // Extract form input values
    const { offername, nbrunit, region, datec } = this.form;
    if (offername === '') {
      validation = true;
    }

    if (nbrunit === '') {
      validation = true;
    }

    if (region === '') {
      validation = true;
    }

    if (!datec) {
      validation = true;
    }

    // Display validation error message or submit the form
    if (!validation) {
      const cq = new Commandereq();
      cq.offername = offername;
      cq.username = this.currentUser.username;
      cq.nbrunit = nbrunit;
      cq.region = region;
      cq.datec = datec;

      this.commandeService.addCommande(cq).subscribe(
        data => {
          this.webSocketService.sendNotificationAdmins("New order has been placed by " + cq.username);
          this.router.navigate(['user/commande']);
        },
        err => {
          // Handle error
        }
      );
    } else {
      alert("All fields marked with * are mandatory.");
    }
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


