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
import { PanelComponent } from './components/panel/panel.component';
import { ManagePublicationsComponent } from './components/publication/manage-publications/manage-publications.component';
import { CreatePublicationComponent } from './components/publication/create-publication/create-publication.component';
import { ViewPublicationsComponent } from './components/publication/view-publications/view-publications.component';
import { UpdatePublicationComponent } from './components/publication/update-publication/update-publication.component';
import { CreateProductComponent } from './components/product/create-product/create-product.component';
import { UpdateProductComponent } from './components/product/update-product/update-product.component';
import { ManageProductsComponent } from './components/product/manage-products/manage-products.component';
import { ViewProductsComponent } from './components/product/view-products/view-products.component';
import { ViewProductComponent } from './components/product/view-product/view-product.component';
import { FooterComponent } from './components/footer/footer.component';

// Toast

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ChangePasswordComponent } from './components/profile/change-password-profile/change-password/change-password.component';
import { UpdateProfileComponent } from './components/profile/update-profile/update-profile/update-profile.component';
import { UpdateProfileCompanyComponent } from './components/profile/update-profile/update-profile-company/update-profile-company.component';
import { UpdateProfileGrocerComponent } from './components/profile/update-profile/update-profile-grocer/update-profile-grocer.component';
import { ViewAllGrocersComponent } from './components/view/view-all-grocers/view-all-grocers.component';
import { ViewAllCompaniesComponent } from './components/view/view-all-companies/view-all-companies.component';
import { ViewAllProductsComponent } from './components/view/view-all-products/view-all-products.component';
import { ViewDetailProductComponent } from './components/view/view-detail-product/view-detail-product.component';
import { SearchComponent } from './components/view/search/search.component';
import { ChatComponent } from './components/chat/chat.component';
import { CreateOrderComponent } from './components/order/create-order/create-order.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ViewOrderComponent } from './components/order/view-order/view-order.component';
import { ViewOrdersComponent } from './components/order/view-orders/view-orders.component';
import { ManageOrdersComponent } from './components/order/manage-orders/manage-orders.component';
import { SuggestedProductPricesComponent } from './components/view/suggested-product-prices/suggested-product-prices/suggested-product-prices.component';
import { UpdateOrderComponent } from './components/order/update-order/update-order.component';
import { CreateProductsComponent } from './components/product/create-products/create-products.component';
import { ViewPublicationComponent } from './components/publication/view-publication/view-publication.component';
import { OAuthModule } from 'angular-oauth2-oidc';


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
    UpdateProviderComponent,
    PanelComponent,
    ManagePublicationsComponent,
    CreatePublicationComponent,
    ViewPublicationsComponent,
    UpdatePublicationComponent,
    CreateProductComponent,
    UpdateProductComponent,
    ManageProductsComponent,
    ViewProductsComponent,
    ViewProductComponent,
    FooterComponent,
    ChangePasswordComponent,
    UpdateProfileComponent,
    UpdateProfileCompanyComponent,
    UpdateProfileGrocerComponent,
    ViewAllGrocersComponent,
    ViewAllCompaniesComponent,
    ViewAllProductsComponent,
    ViewDetailProductComponent,
    SearchComponent,
    ChatComponent,
    CreateOrderComponent,
    LoaderComponent,
    ViewOrderComponent,
    ViewOrdersComponent,
    ManageOrdersComponent,
    SuggestedProductPricesComponent,
    UpdateOrderComponent,
    CreateProductsComponent,
    ViewPublicationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    OAuthModule.forRoot(),
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
