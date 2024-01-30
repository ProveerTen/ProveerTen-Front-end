import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Register component
import { RegisterComponent } from './components/auth/register/register/register.component';

// Login component
import { LoginComponent } from './components/auth/login/login/login.component';

// Home component
import { HomeComponent } from './components/home/home.component';

// update profile component
import { UpdateProfileComponent } from './components/profile/update-profile/update-profile/update-profile.component';

// delete data profile component
import { DeleteDataProfileComponent } from './components/profile/delete-data-profile/delete-data-profile/delete-data-profile.component';

// change password profile component
import { ChangePasswordComponent } from './components/profile/change-password-profile/change-password/change-password.component';

// 404 component
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

// Guards
import { homeGuard } from 'src/guards/guards-components/home.guard';
import { ViewProfileComponent } from './components/profile/view-profile/view-profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [homeGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile/:id',
    component: ViewProfileComponent
  },
  {
    path: 'update-profile/:id', 
    component:UpdateProfileComponent
  },
  {
    path: 'deleteData-profile/:id',
    component: DeleteDataProfileComponent
  },
  {
    path: 'change-password-profile',
    component: ChangePasswordComponent
  },
  {
    path: '404',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full'
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
