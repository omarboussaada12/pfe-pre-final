import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Offer } from 'src/app/_model/Offer';
import { CommandeService } from 'src/app/_services/commande.service';
import { OfferService } from 'src/app/_services/offer.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';
import { WebSocketService } from 'src/app/web-socket.service';

@Component({
  selector: 'app-addoffer',
  templateUrl: './addoffer.component.html',
  styleUrls: ['./addoffer.component.css']
})
export class AddofferComponent implements OnInit {
  form: any = {
    offername: "",
    prixunit: "",
    description: "",
    file: null
  };
  imageSrc: string = "";
  currentFile?: any;
  imageadded: boolean =false ;
  isSuccessful:boolean=false;
  isnotSuccessful:boolean=false;
  errorMessage:any;
 
 
 constructor(private http: HttpClient,
   private offerService : OfferService,
   private webSocketService : WebSocketService,
   private router: Router,) { }
  ngOnInit(): void {
  }
   
  
 onFileChange(event: any) {
  const file = event.target.files[0];
  this.form.file = file;
  this.currentFile =file ;
  const reader = new FileReader();
  reader.onload = () => {
    this.imageSrc = reader.result as string;
  };
  reader.readAsDataURL(file);
}
submit() {
    if (!this.form.offername || !this.form.prixunit || !this.form.description || !this.form.file) {
      console.error('Please fill in all fields and select an image.');
      this.isnotSuccessful =true;
      this.isSuccessful =false;
      return  this.errorMessage = 'Please fill in all fields and select an image.';
    }else
    {
      const formData: FormData = new FormData();
      formData.append('file', this.currentFile);
      const offer = {
        name: this.form.offername,
        prixunit: this.form.prixunit,
        description: this.form.description,
      
      };
      this.offerService.addOffer(offer).subscribe(
        data => {
          this.offerService.offerimage(offer.name,this.currentFile).subscribe(
            data => { 
              this.isnotSuccessful =false;
              this.isSuccessful =true;
              this.webSocketService.sendNotificationUsers(" New service have been added ");
              this.router.navigate(['admin/service/'])
            }
          );
        },
        err => {
          this.isnotSuccessful =true;
          this.isSuccessful =false;
          this.errorMessage = err.error.message;
        }
      );
     
    }
    }
   
 }
