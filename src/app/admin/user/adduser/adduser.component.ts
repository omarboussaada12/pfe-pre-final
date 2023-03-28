import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
changeoffer($event: any) {
throw new Error('Method not implemented.');
}
form: any = {
  username :"",
  firstname: "",
  lastname: "",
  email: "",
  address: "",
  phone: "",
  role: ""
};
  constructor(private  userservice: UserService , private  uservice: AuthService) {}

  ngOnInit(): void {
  }
  
   
 
   
  onSubmit(){
 console.log(this.form) ;
  }
 }

