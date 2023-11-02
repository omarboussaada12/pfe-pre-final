import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { LoginComponent } from './login/login.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { UserComponent } from './admin/user/user.component';
import { OfferComponent } from './admin/offer/offer.component';
import { CommandeComponent } from './admin/commande/commande.component';
import { EditComponent } from './admin/commande/edit/edit.component';
import { AddComponent } from './admin/commande/add/add.component';
import { ImageComponent } from './profile/image/image.component';
import { EditPComponent } from './profile/edit/edit.component';
import { AddofferComponent } from './admin/offer/addoffer/addoffer.component';
import { AdduserComponent } from './admin/user/adduser/adduser.component';
import { EdituserComponent } from './admin/user/edituser/edituser.component';
import { EditofferComponent } from './admin/offer/editoffer/editoffer.component';
import { ClientComponent } from './client/client.component';
import { CareerComponent } from './career/career.component';
import { ReclamationComponent } from './admin/reclamation/reclamation.component';
import { DatePipe } from '@angular/common';
import { DetailComponent } from './admin/commande/detail/detail.component';
import { WebSocketService } from './web-socket.service';
import { AddreclamationComponent } from './admin/reclamation/addreclamation/addreclamation.component';
import { EditreclamationComponent } from './admin/reclamation/editreclamation/editreclamation.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LandingComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    UserComponent,
    OfferComponent,
    CommandeComponent,
    EditComponent,
    AddComponent,
    ImageComponent,
    EditPComponent,
    AddofferComponent,
    AdduserComponent,
    EdituserComponent,
    EditofferComponent,
    ClientComponent,
    CareerComponent,
    ReclamationComponent,
    DetailComponent,
    AddreclamationComponent,
    EditreclamationComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [authInterceptorProviders , DatePipe , WebSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
