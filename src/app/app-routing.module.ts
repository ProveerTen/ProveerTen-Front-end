import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { RegisterComponent } from './components/auth/register/register/register.component';
import { LoginComponent } from './components/auth/login/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ViewProfileComponent } from './components/profile/view-profile/view-profile.component';
import { ViewProfileCompanyComponent } from './components/profile/view-profile-company/view-profile-company.component';
import { ViewProfileProviderComponent } from './components/profile/view-profile-provider/view-profile-provider.component';
import { ViewProfileGrocerComponent } from './components/profile/view-profile-grocer/view-profile-grocer.component';
import { UpdateProfileComponent } from './components/profile/update-profile/update-profile/update-profile.component';
import { ChangePasswordComponent } from './components/profile/change-password-profile/change-password/change-password.component';
import { ViewAllGrocersComponent } from './components/view/view-all-grocers/view-all-grocers.component';
import { CreateProviderComponent } from './components/provider/create-provider/create-provider.component';
import { ManageProvidersComponent } from './components/provider/manage-providers/manage-providers.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UpdateProviderComponent } from './components/provider/update-provider/update-provider.component';
import { PanelComponent } from './components/panel/panel.component';
import { ManagePublicationsComponent } from './components/publication/manage-publications/manage-publications.component';
import { CreatePublicationComponent } from './components/publication/create-publication/create-publication.component';
import { UpdatePublicationComponent } from './components/publication/update-publication/update-publication.component';
import { ManageProductsComponent } from './components/product/manage-products/manage-products.component';
import { CreateProductComponent } from './components/product/create-product/create-product.component';
import { UpdateProductComponent } from './components/product/update-product/update-product.component';
import { ViewProductComponent } from './components/product/view-product/view-product.component';
import { SearchComponent } from './components/view/search/search.component';
import { CreateOrderComponent } from './components/order/create-order/create-order.component';
import { ViewOrderComponent } from './components/order/view-order/view-order.component';
import { ViewOrdersComponent } from './components/order/view-orders/view-orders.component';
import { ManageOrdersComponent } from './components/order/manage-orders/manage-orders.component';
import { SuggestedProductPricesComponent } from './components/view/suggested-product-prices/suggested-product-prices/suggested-product-prices.component';
import { UpdateOrderComponent } from './components/order/update-order/update-order.component';
import { CreateProductsComponent } from './components/product/create-products/create-products.component';
import { ViewProductsComponent } from './components/product/view-products/view-products.component';
import { ChatComponent } from './components/chat/chat.component';

import { LoaderComponent } from './components/loader/loader.component';
import { DeleteDataProfileGrocerComponent } from './components/profile/delete-data-profile/delete-data-profile-grocer/delete-data-profile-grocer.component';
import { ViewAllCompaniesComponent } from './components/view/view-all-companies/view-all-companies.component';
import { ViewAllProductsComponent } from './components/view/view-all-products/view-all-products.component';

// Guards

import { grocerGuard } from 'src/app/guards/role-guards/grocer.guard';
import { guestGuard } from 'src/app/guards/role-guards/guest.guard';
import { providerGuard } from 'src/app/guards/role-guards/provider.guard';
import { companyGuard } from 'src/app/guards/role-guards/company.guard';
import { profileUploadImageGuard } from './guards/guards-components/profile-upload-image.guard';
import { expiredTokenGuard } from './guards/guards-components/expiredToken.guard';
import { companyProviderGuard } from './guards/role-guards/company-provider.guard';
import { companyProviderGrocerGuard } from './guards/role-guards/company-provider-grocer.guard';
import { grocerGuestGuard } from './guards/role-guards/grocer-guest.guard';
import { userGuard } from './guards/role-guards/user.guard';
import { grocerCompanyGuard } from './guards/role-guards/grocer-company.guard';
import { grocerProviderGuestGuard } from './guards/role-guards/grocer-provider-guest.guard';
import { grocerProviderGuard } from './guards/role-guards/grocer-provider.guard';
import { homeGuard } from './guards/guards-components/home.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [homeGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [guestGuard]
  },
  // {
  //   path: 'loader',
  //   component: LoaderComponent
  // },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [guestGuard]
  },
  {
    path: 'profile',
    component: ViewProfileComponent,
    canActivate: [expiredTokenGuard, userGuard],
    canDeactivate: [profileUploadImageGuard]
  },
  {
    path: 'update-profile/:id',
    component: UpdateProfileComponent,
    canActivate: [userGuard],
  },
  {
    path: 'change-password-profile',
    component: ChangePasswordComponent,
    canActivate: [grocerCompanyGuard]
  },
  {
    path: 'view/grocers',
    component: ViewAllGrocersComponent,
    canActivate: [providerGuard]
  },
  // {
  //   path: 'viewAllcompanies',
  //   component: ViewAllCompaniesComponent, // Revisar, al parecer toca eliminar este componente, no se usa
  //   canActivate: [grocerGuestGuard]
  // },
  {
    path: 'profile/company/:id',
    component: ViewProfileCompanyComponent,
    canActivate: [expiredTokenGuard, grocerProviderGuestGuard],

  },
  {
    path: 'profile/provider/:id',
    component: ViewProfileProviderComponent,
    canActivate: [expiredTokenGuard, grocerCompanyGuard]
  },
  {
    path: 'profile/grocer/:id',
    component: ViewProfileGrocerComponent,
    canActivate: [expiredTokenGuard, companyProviderGuard]
  },
  // {
  //   path: 'delete/data/grocer/:id',
  //   component: DeleteDataProfileGrocerComponent // Eliminar componente cuando se haga limpieza
  // },
  {
    path: 'panel',
    component: PanelComponent,
    canActivate: [companyProviderGuard]
  },
  {
    path: 'manage/providers',
    component: ManageProvidersComponent,
    canActivate: [companyGuard] // Testetar
  },
  {
    path: 'create/provider',
    component: CreateProviderComponent,
    canActivate: [companyGuard]
  },
  {
    path: 'update/provider/:id',
    component: UpdateProviderComponent,
    canActivate: [companyGuard]
  },
  {
    path: 'manage/publications',
    component: ManagePublicationsComponent,
    canActivate: [companyGuard]
  },
  {
    path: 'create/publication',
    component: CreatePublicationComponent,
    canActivate: [companyGuard]
  },
  {
    path: 'update/publication/:id',
    component: UpdatePublicationComponent,
    canActivate: [companyGuard]
  },
  {
    path: 'manage/products',
    component: ManageProductsComponent,
    canActivate: [companyGuard]
  },
  {
    path: 'create/product',
    component: CreateProductComponent,
    canActivate: [companyGuard]
  },
  {
    path: 'create/products',
    component: CreateProductsComponent,
    canActivate: [companyGuard]
  },
  {
    path: 'update/product/:id',
    component: UpdateProductComponent,
    canActivate: [companyGuard]
  },
  {
    path: 'view/product/:id',
    component: ViewProductComponent // Revisar, todos pueden pero los trabajadores y empresas deben de tener un filtro de ver productos de su mismo dominio
  },
  {
    path: 'view/products/:id',
    component: ViewProductsComponent // Revisar, todos pueden pero los trabajadores y empresas deben de tener un filtro de ver productos de su mismo dominio
  },
  // {
  //   path: 'viewAllProducts',
  //   component: ViewAllProductsComponent,
  //   canActivate: [grocerGuestGuard] // Revisar, probablemente se elimine esto, es similar a la implementación de productos del search
  // },
  {
    path: 'search/:type',
    component: SearchComponent,
    canActivate: [grocerGuestGuard]
  },
  {
    path: 'search/:type/:value',
    component: SearchComponent,
    canActivate: [grocerGuestGuard]
  },
  {
    path: 'create/order',
    component: CreateOrderComponent,
    canActivate: [grocerGuard]
  },
  {
    path: 'view/orders',
    component: ViewOrdersComponent,
    canActivate: [grocerGuard]
  },
  {
    path: 'view/order/:id',
    component: ViewOrderComponent,
    canActivate: [companyProviderGrocerGuard]
  },
  {
    path: 'manage/orders',
    component: ManageOrdersComponent,
    canActivate: [companyProviderGuard]
  },
  {
    path: 'update/order/:id',
    component: UpdateOrderComponent,
    canActivate: [grocerGuard]
  },
  {
    path: 'view/price/products',
    component: SuggestedProductPricesComponent,
    canActivate: [grocerGuard]
  },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [grocerProviderGuard]
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
