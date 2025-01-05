import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_helpers';
import { Role } from './_models';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';



const accountModule = () => import('./accounts/account.module').then(x => x.AccountModule);
const profileModule = () => import('./profile/profile.module').then(x => x.ProfileModule);

const routes: Routes = [
    { path: 'account', loadChildren: accountModule },
    { path: '', component: LandingPageComponent }, 
    { path: 'about', component: AboutUsComponent },
    { path: 'home', component: HomeComponent},
    { path: 'profile', loadChildren: profileModule, canActivate: [AuthGuard] },

    { path: '**', redirectTo: '' },

    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }