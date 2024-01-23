import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// home component
import { HomeComponent } from './components/home/home.component';

// register component
import { RegisterComponent } from './components/auth/register/register/register.component';
import { RegisterCompanyComponent } from './components/auth/register/register-company/register-company.component';
import { RegisterGrocerComponent } from './components/auth/register/register-grocer/register-grocer.component';

// login component 
import { LoginComponent } from './components/auth/login/login/login.component';
import { LoginGrocerComponent } from './components/auth/login/login-grocer/login-grocer.component';
import { LoginCompanyComponent } from './components/auth/login/login-company/login-company.component';

// profile component
import { ViewMyProfileComponent } from './components/profile/view-profile/view-my-profile/view-my-profile.component';
import { ViewOtherProfileComponent } from './components/profile/view-profile/view-other-profile/view-other-profile.component';

import { AuthGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'view-my-profile/:id', component: ViewMyProfileComponent },
  { path: 'view-profile/:id', component: ViewOtherProfileComponent },
  // { path: 'register/company', component: RegisterCompanyComponent, canActivate: [AuthGuard] },
  // { path: 'register/grocer', component: RegisterGrocerComponent, canActivate: [AuthGuard] },
  // { path: 'login/company', component: LoginCompanyComponent, canActivate: [AuthGuard] },
  // { path: 'login/grocer', component: LoginGrocerComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
