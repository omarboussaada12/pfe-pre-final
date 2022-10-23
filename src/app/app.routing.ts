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

const routes: Routes =[
    { path: 'home',             component: HomeComponent },
    { path: 'user-profile',     component: ProfileComponent },
    { path: 'user-profile/image', component: ImageComponent },
    { path: 'user-profile/edit',     component: EditPComponent },
    { path: 'register',           component: SignupComponent },
    { path: 'landing',          component: LandingComponent },
    { path: 'login',          component: LoginComponent },
    { path: 'admin/user', component: UserComponent },
    { path: 'admin/offer', component: OfferComponent },
    { path: 'admin/offer/add', component:  AddofferComponent},
    { path: 'admin/commande', component: CommandeComponent },
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
