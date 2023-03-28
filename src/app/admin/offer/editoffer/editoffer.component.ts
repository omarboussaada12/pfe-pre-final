import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferService } from 'src/app/_services/offer.service';

@Component({
  selector: 'app-editoffer',
  templateUrl: './editoffer.component.html',
  styleUrls: ['./editoffer.component.css']
})
export class EditofferComponent implements OnInit {
  imageSrc: string = '';
  changeimage : boolean = false ;
  form: any = {
    name :"",
    prixunit: "",
    description: ""
  };
  offer : any = {id :'',name:'' , prixunit:'', description:'',image:'' };
  currentFile?: any;
  isSuccessful:boolean=false;
  isSuccessfulimage:boolean=false;
  errorMessage:any;
 
 
 constructor(private http: HttpClient, 
  private offerService : OfferService ,
   private route: ActivatedRoute,
   private router: Router,) { }
  ngOnInit(): void {
   this.getofferbyid();
  }
   
  getofferbyid() {
    this.offerService.getSingleOffer(+this.route.snapshot.params['id']).subscribe((res: {}) => {
      this.offer = res;
      this.form.name = this.offer.name ;
      this.form.prixunit = this.offer.prixunit ;
      this.form.description =this.offer.description ;
      this.imageSrc = this.offer.image.url ;
    });
  }
 
  
 onFileChange(event:any) {
   this.changeimage = true ;
   const reader = new FileReader();
   if(event.target.files && event.target.files.length) {
     const [file] = event.target.files;
     this.currentFile =file ;
     console.log(this.currentFile);
     reader.readAsDataURL(file);
   
     reader.onload = () => {
  
       this.imageSrc = reader.result as string;
     };
  
   }
 }
  
 submit(){
  this.offer.id = this.route.snapshot.params['id'];
  this.offer.name = this.form.name;
  this.offer.prixunit = this.form.prixunit;
  this.offer.description = this.form.description;
  const formData: FormData = new FormData();
  formData.append('file', this.currentFile);
  this.offer.image = formData ;
  this.offerService.updateOffer(this.route.snapshot.params['id'],this.offer).subscribe(
    data => {
     if(this.changeimage != false)
     {
      this.offerService.offerimage(this.offer.name,this.currentFile).subscribe(
        data => {
          this.isSuccessfulimage = true;
        },
        err => {
          this.errorMessage = err.error.message;
        }
      );
     }else{
      this.router.navigate(['admin/service'])
     }
    },
    err => {
      this.errorMessage = err.error.message;
    }
  );
 }
}