import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommandeService } from 'src/app/_services/commande.service';
import { OfferService } from 'src/app/_services/offer.service';
import { ReclamationService } from 'src/app/_services/reclamation.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';
import { WebSocketService } from 'src/app/web-socket.service';

@Component({
  selector: 'app-addreclamation',
  templateUrl: './addreclamation.component.html',
  styleUrls: ['./addreclamation.component.css']
})
export class AddreclamationComponent implements OnInit {
  form: any = {
    message: ""
  };
  currentUser: any ='';
  content?: string;
  show: boolean = false;
  alert: boolean = false;
  constructor(private userService: UserService,
    private reclamationService: ReclamationService,
    private router: Router,
    private webSocketService: WebSocketService,
    private token: TokenStorageService) { }

  ngOnInit(): void {
    this.userService.getModeratorBoard().subscribe(
      data => {
        this.content = data;
        this.show = true;
      },
      err => {
        this.content = JSON.parse(err.error).message;
        this.show = false;
        this.router.navigate(['/login'])
      }
    );
  }
  onSubmit(){
    const {message } = this.form;
    this.currentUser = this.token.getUser();
   
    let validation = false;
    if (message === '') {
      validation = true;
    }
    if (this.currentUser.username === '') {
      validation = true;
    }
    if (!validation) {
      const reclamation = new reclamationreq();
      reclamation.message = message ;
      reclamation.username = this.currentUser.username; ;

      this.reclamationService.addReclamation(reclamation).subscribe(
        data => {
          this.webSocketService.sendNotificationAdmins("A new reclamation has been placed by " + reclamation.username);
          this.router.navigate(['reclamation']);
        },
        err => {
        }
      );
    } else {
      alert("your text must contain more than 0 and less than 255 characters ");
    }
   
    
  }

}
export class reclamationreq {
  message?: string;
  username?: string;
  
}
