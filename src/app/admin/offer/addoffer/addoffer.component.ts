import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Offer } from 'src/app/_model/Offer';
import { CommandeService } from 'src/app/_services/commande.service';
import { OfferService } from 'src/app/_services/offer.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-addoffer',
  templateUrl: './addoffer.component.html',
  styleUrls: ['./addoffer.component.css']
})
export class AddofferComponent implements OnInit {
  imageSrc: string = "";
  offer : any = {name:'' , prixunit:'', description:'' };
  currentFile?: any;
  imageadded: boolean =false ;
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
 
 constructor(private http: HttpClient,
   private offerService : OfferService,
   private router: Router,) { }
  ngOnInit(): void {
  }
   
 get f(){
   return this.myForm.controls;
 }
  
 onFileChange(event:any) {
  this.imageadded = true;
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
  if(this.imageadded === false)
  {
    confirm("you need to select an image for this service");
  }else{
    this.offerService.addOffer(this.offer).subscribe(
      data => {
        this.isSuccessful = true;
        this.offerService.offerimage(this.offer.name,this.currentFile).subscribe(
          data => {
            this.router.navigate(['admin/service/'])
           
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
}