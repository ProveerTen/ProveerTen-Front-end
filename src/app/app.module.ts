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
import { DeleteDataProfileGrocerComponent } from './components/profile/delete-data-profile/delete-data-profile-grocer/delete-data-profile-grocer.component';

// Directives
import { BrokenImageDirective } from './directives/image/broken-image.directive';
import { BrokenImageProfileDirective } from './directives/image/broken-image-profile.directive';
import { CreateProviderComponent } from './components/provider/create-provider/create-provider.component';
import { ManageProvidersComponent } from './components/provider/manage-providers/manage-providers.component';
import { ViewProvidersComponent } from './components/provider/view-providers/view-providers.component';
import { UpdateProviderComponent } from './components/provider/update-provider/update-provider.component';

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
    DeleteDataProfileGrocerComponent,
    BrokenImageDirective,
    BrokenImageProfileDirective,
    CreateProviderComponent,
    ManageProvidersComponent,
    ViewProvidersComponent,
    UpdateProviderComponent
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
