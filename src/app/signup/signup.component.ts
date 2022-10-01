import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test : Date = new Date();
    focus;
    focus1;
    focus2;
    form: any = {
        username: null,
        firstname: null,
        lastname: null,
        phone: null,
        address: null,
        email: null,
        password: null
      };
      isSuccessful = false;
      isSignUpFailed = false;
      errorMessage = '';
    
      constructor(private authService: AuthService) { }
    
      ngOnInit(): void {
      }
    
      onSubmit(): void {
        const { username,firstname,lastname,phone,address, email, password } = this.form;
    
        this.authService.register(username,firstname,lastname, phone ,address, email, password).subscribe(
          data => {
            console.log(data);
            this.isSuccessful = true;
            this.isSignUpFailed = false;
          },
          err => {
            this.errorMessage = err.error.message;
            this.isSignUpFailed = true;
          }
        );
      }
    }
    