import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
  form: any = {
    username :"",
    firstname: null,
    lastname: "",
    phone :'',
    address :'',
    email :'',
    roles :''
  };
  user :any = { username :'' , firstname :'' , lastname :'' , phone :'' ,address :'' , email :'', image :'',roles:[] } 
  newrole: "";
  errorMessage: any;
  constructor( private userService : UserService,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['username']);
    this.fetchoneuser(this.route.snapshot.params['username']);
  }
  fetchoneuser(username : any) {
    return this.userService.getSingleUser(username).subscribe((res: {}) => {
      this.user = res;
      this.form.username = this.user.username ;
      this.form.firstname = this.user.firstname ;
      this.form.lastname = this.user.lastname ;
      this.form.phone = this.user.phone ;
      this.form.address = this.user.address ;
      this.form.email = this.user.email ;
      this.form.roles =this.user.roles[0].name ;
      this.newrole =this.user.roles[0].name ;

    });
  }
  changerole(e:any){
    this.newrole =e.target.value ;
  }
    onSubmit() {
      console.log("in")
      if(this.newrole ===  this.user.roles[0].name )
      {
        this.router.navigate(['admin/user'])
      }else
      {
        this.userService.updateroleUser(this.user.username , this.newrole).subscribe(
          data => {
            this.router.navigate(['admin/user'])
          },
          err => {
            this.errorMessage = err.error.message;
            console.log('errorMessage')
          }
        );
      }
    
    }
}
