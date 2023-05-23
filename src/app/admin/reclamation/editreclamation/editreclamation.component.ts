import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReclamationService } from 'src/app/_services/reclamation.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';
import { WebSocketService } from 'src/app/web-socket.service';

@Component({
  selector: 'app-editreclamation',
  templateUrl: './editreclamation.component.html',
  styleUrls: ['./editreclamation.component.css']
})
export class EditreclamationComponent implements OnInit {
  reclamation :any ;
  currentUser: any = '';
  content?: string;
  show: boolean = false;
  alert: boolean = false;
  status: string = '';
  changestatus(e: any) {
    console.log(e.target.value)
    this.status = e.target.value;
  }
  constructor(private userService: UserService,
    private reclamationService: ReclamationService,
    private router: Router,
    private webSocketService: WebSocketService,
    private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
        this.show = true;
        this.getreclamationbyid()
      },
      err => {
        this.content = JSON.parse(err.error).message;
        this.show = false;
        this.router.navigate(['/login'])
      }
    );
  }
  getreclamationbyid() {
    this.reclamationService.getSinglereclamtion(+this.route.snapshot.params['id']).subscribe((res: {}) => {
      this.reclamation = res;
    });

  }
  onsubmite() {
    console.log(this.status);
      if (this.status !== '') {
        if (confirm("Are you sure to  " + this.status + " this commande")) {
        this.reclamationService.processreclamation(+this.route.snapshot.params['id'],this.status).subscribe(
          data => {
            this.webSocketService.sendPrivateNotification(this.reclamation.username, " your complaint has been processed", this.reclamation.username);
            this.router.navigate(['reclamation'])
          },
          err => {
            console.log(this.status)
          }
        );
        }
      }else
      {
        console.log("shoose a status")
      }
     
    }
  }




