import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { NavComponent } from './components/nav/nav.component';
import { LoginGrocerComponent } from './components/auth/login/login-grocer/login-grocer.component';
import { LoginProviderComponent } from './components/auth/login/login-provider/login-provider.component';
import { LoginCompanyComponent } from './components/auth/login/login-company/login-company.component';
import { RegisterGrocerComponent } from './components/auth/register/register-grocer/register-grocer.component';
import { RegisterCompanyComponent } from './components/auth/register/register-company/register-company.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login/login.component';
import { RegisterComponent } from './components/auth/register/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginGrocerComponent,
    LoginProviderComponent,
    LoginCompanyComponent,
    RegisterGrocerComponent,
    RegisterCompanyComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
