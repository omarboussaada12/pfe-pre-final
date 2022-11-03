import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OfferService } from 'src/app/_services/offer.service';

@Component({
  selector: 'app-editoffer',
  templateUrl: './editoffer.component.html',
  styleUrls: ['./editoffer.component.css']
})
export class EditofferComponent implements OnInit {
  imageSrc: string = '';
  offer : any = {name:'' , prixunit:'', description:'' };
  currentFile?: any;
  isSuccessful:boolean=false;
  isSuccessfulimage:boolean=false;
  errorMessage:any;
  myForm = new FormGroup({
   offername: new FormControl('', [Validators.required, Validators.minLength(5)]),
   prixunit: new FormControl('', [Validators.required]),
   description: new FormControl('', [Validators.required]),
   file: new FormControl('', [Validators.required]),
   fileSource: new FormControl('', [Validators.required])
 });
 
 constructor(private http: HttpClient, private offerService : OfferService , private route: ActivatedRoute,) { }
  ngOnInit(): void {
   this.getofferbyid();
   console.log(this.offer.name)
  }
   
  getofferbyid() {
    this.offerService.getSingleOffer(+this.route.snapshot.params['id']).subscribe((res: {}) => {
      this.offer = res;
      console.log(this.offer);
    });
  }
 get f(){
   return this.myForm.controls;
 }
  
 onFileChange(event:any) {
   const reader = new FileReader();
   
   if(event.target.files && event.target.files.length) {
     const [file] = event.target.files;
     this.currentFile =file ;
     console.log(this.currentFile);
     reader.readAsDataURL(file);
   
     reader.onload = () => {
  
       this.imageSrc = reader.result as string;
    
       this.myForm.patchValue({
         fileSource: reader.result
       });
  
     };
  
   }
 }
  
 submit(){
  
  this.offer.name = this.myForm.value.offername;
  this.offer.prixunit = this.myForm.value.prixunit;
  this.offer.description = this.myForm.value.description;
  const formData: FormData = new FormData();
  formData.append('file', this.currentFile);
  this.offer.image = formData ;
  console.log(this.offer);
  this.offerService.addOffer(this.offer).subscribe(
    data => {
      this.isSuccessful = true;
      this.offerService.offerimage(this.offer.name,this.currentFile).subscribe(
        data => {
          this.isSuccessfulimage = true;
        },
        err => {
          this.errorMessage = err.error.message;
        }
      );
    },
    err => {
      this.errorMessage = err.error.message;
    }
  );
 }
}