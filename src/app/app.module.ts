import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Components

import { LoginComponent } from './components/auth/login/login/login.component';
import { LoginGrocerComponent } from './components/auth/login/login-grocer/login-grocer.component';

import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { LoginCompanyComponent } from './components/auth/login/login-company/login-company.component';
import { LoginProviderComponent } from './components/auth/login/login-provider/login-provider.component';

import { RegisterGrocerComponent } from './components/auth/register/register-grocer/register-grocer.component';
import { RegisterCompanyComponent } from './components/auth/register/register-company/register-company.component';
import { RegisterComponent } from './components/auth/register/register/register.component';
import { ViewProfileComponent } from './components/profile/view-profile/view-profile.component';
import { ViewProfileProviderComponent } from './components/profile/view-profile-provider/view-profile-provider.component';
import { ViewProfileCompanyComponent } from './components/profile/view-profile-company/view-profile-company.component';
import { ViewProfileGrocerComponent } from './components/profile/view-profile-grocer/view-profile-grocer.component';
import { UpdateProfileComponent } from './components/profile/update-profile/update-profile/update-profile.component';
import { UpdateProfileCompanyComponent } from './components/profile/update-profile/update-profile-company/update-profile-company.component';
import { UpdateProfileProviderComponent } from './components/profile/update-profile/update-profile-provider/update-profile-provider.component';
import { UpdateProfileGrocerComponent } from './components/profile/update-profile/update-profile-grocer/update-profile-grocer.component';
import { DeleteDataProfileComponent } from './components/profile/delete-data-profile/delete-data-profile/delete-data-profile.component';
import { DeleteDataProfileCompanyComponent } from './components/profile/delete-data-profile/delete-data-profile-company/delete-data-profile-company.component';
import { DeleteDataProfileProviderComponent } from './components/profile/delete-data-profile/delete-data-profile-provider/delete-data-profile-provider.component';
import { DeleteDataProfileGrocerComponent } from './components/profile/delete-data-profile/delete-data-profile-grocer/delete-data-profile-grocer.component';
import { ChangePasswordComponent } from './components/profile/change-password-profile/change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginGrocerComponent,
    NavComponent,
    LoginCompanyComponent,
    HomeComponent,
    PageNotFoundComponent,
    LoginProviderComponent,
    RegisterGrocerComponent,
    RegisterCompanyComponent,
    RegisterComponent,
    ViewProfileComponent,
    ViewProfileProviderComponent,
    ViewProfileCompanyComponent,
    ViewProfileGrocerComponent,
    UpdateProfileComponent,
    UpdateProfileCompanyComponent,
    UpdateProfileProviderComponent,
    UpdateProfileGrocerComponent,
    DeleteDataProfileComponent,
    DeleteDataProfileCompanyComponent,
    DeleteDataProfileProviderComponent,
    DeleteDataProfileGrocerComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
