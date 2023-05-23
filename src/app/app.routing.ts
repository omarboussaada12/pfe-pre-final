import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './admin/user/user.component';
import { CommandeComponent} from './admin/commande/commande.component'
import { OfferComponent } from './admin/offer/offer.component';
import { AddComponent } from './admin/commande/add/add.component';
import { EditComponent } from './admin/commande/edit/edit.component';
import { EditPComponent } from './profile/edit/edit.component';
import { ImageComponent } from './profile/image/image.component';
import { AddofferComponent } from './admin/offer/addoffer/addoffer.component';
import { AdduserComponent } from './admin/user/adduser/adduser.component';
import { EdituserComponent } from './admin/user/edituser/edituser.component';
import { EditofferComponent } from './admin/offer/editoffer/editoffer.component';
import { ClientComponent } from './client/client.component';
import { CareerComponent } from './career/career.component';
import { ReclamationComponent } from './admin/reclamation/reclamation.component';
import { DetailComponent } from './admin/commande/detail/detail.component';
import { AddreclamationComponent } from './admin/reclamation/addreclamation/addreclamation.component';
import { EditreclamationComponent } from './admin/reclamation/editreclamation/editreclamation.component';

const routes: Routes =[
    { path: 'home',             component: HomeComponent },
    { path: 'reclamation',             component: ReclamationComponent },
    { path: 'reclamation/add',             component: AddreclamationComponent },
    { path: 'reclamation/process/:id',             component: EditreclamationComponent },
    { path: 'user-profile',     component: ProfileComponent },
    { path: 'user-profile/image', component: ImageComponent },
    { path: 'user-profile/edit',     component: EditPComponent },
    { path: 'register',           component: SignupComponent },
    { path: 'landing',          component: LandingComponent },
    { path: 'login',          component: LoginComponent },
    { path: 'client/oasis',          component: ClientComponent },
    { path: 'Career',          component: CareerComponent },
    { path: 'admin/user', component: UserComponent },
    { path: 'admin/user/edit/:username', component: EdituserComponent },
    { path: 'admin/user/add', component: AdduserComponent },
    { path: 'admin/service', component: OfferComponent },
    { path: 'admin/service/edit/:id', component: EditofferComponent },
    { path: 'admin/service/add', component:  AddofferComponent},
    { path: 'admin/commande', component: CommandeComponent },
    { path: 'admin/commande/detail/:id', component: DetailComponent },
    { path: 'user/commande', component: CommandeComponent },
    { path: 'user/commande/add', component: AddComponent },
    { path: 'user/commande/update/:id', component: EditComponent },
    { path: '', redirectTo: 'landing', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
