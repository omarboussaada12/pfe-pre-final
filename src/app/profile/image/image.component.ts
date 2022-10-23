import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  //load user 
  currentUser: any;
   user :any = { username :'' , firstname :'' , lastname :'' , phone :'' ,address :'' , email :''  } 
  content?: string;

  // load image 
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  constructor(private token: TokenStorageService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.userService.getUserBoard().subscribe(
      data => {
        this.content = data;
        this.currentUser = this.token.getUser();
        this.fetchoneuser(this.currentUser.username)
      },
      err => {
        this.content = JSON.parse(err.error).message;
        this.router.navigate(['landing'])
      }
    );

  }
  fetchoneuser(username: any) {
    return this.userService.getSingleUser(username).subscribe((res: {}) => {
      this.user = res;
    });
  }
 
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;

        this.userService.updateUserimage(this.currentUser.username, this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.router.navigate(['user-profile']);
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          });

      }

      this.selectedFiles = undefined;
    }
  }
}

