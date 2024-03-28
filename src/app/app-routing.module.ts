import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Register component
import { RegisterComponent } from './components/auth/register/register/register.component';

// Login component
import { LoginComponent } from './components/auth/login/login/login.component';

// Home component
import { HomeComponent } from './components/home/home.component';

// Profile
import { ViewProfileComponent } from './components/profile/view-profile/view-profile.component';
import { ViewProfileCompanyComponent } from './components/profile/view-profile-company/view-profile-company.component';
import { ViewProfileProviderComponent } from './components/profile/view-profile-provider/view-profile-provider.component';
import { ViewProfileGrocerComponent } from './components/profile/view-profile-grocer/view-profile-grocer.component';

// update profile component
import { UpdateProfileComponent } from './components/profile/update-profile/update-profile/update-profile.component';

// change password profile component
import { ChangePasswordComponent } from './components/profile/change-password-profile/change-password/change-password.component';

// View all Grocers-companies Component
import { ViewAllGrocersComponent } from './components/view/view-all-grocers/view-all-grocers.component';
import { ViewAllCompaniesComponent } from './components/view/view-all-companies/view-all-companies.component';

import { ViewAllProductsComponent } from './components/view/view-all-products/view-all-products.component';

// Provider
import { CreateProviderComponent } from './components/provider/create-provider/create-provider.component';
import { ManageProvidersComponent } from './components/provider/manage-providers/manage-providers.component';

// 404 component
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

// Guards
import { homeGuard } from 'src/app/guards/guards-components/home.guard';

import { grocerGuard } from 'src/app/guards/role-guards/grocer.guard';
import { offlineGuard } from 'src/app/guards/role-guards/offline.guard';
import { providerGuard } from 'src/app/guards/role-guards/provider.guard';
import { companyGuard } from 'src/app/guards/role-guards/company.guard';
import { profileCompanyGuard } from 'src/app/guards/guards-components/profileCompany.guard';
import { profileProviderGuard } from 'src/app/guards/guards-components/profileProvider.guard';
import { profileGrocerGuard } from 'src/app/guards/guards-components/profileGrocer.guard';
import { DeleteDataProfileGrocerComponent } from './components/profile/delete-data-profile/delete-data-profile-grocer/delete-data-profile-grocer.component';
import { profileUploadImageGuard } from './guards/guards-components/profile-upload-image.guard';
import { profileGuard } from './guards/guards-components/profile.guard';
import { expiredTokenGuard } from './guards/guards-components/expiredToken.guard';
import { UpdateProviderComponent } from './components/provider/update-provider/update-provider.component';
import { PanelComponent } from './components/panel/panel.component';
import { panelGuard } from './guards/guards-components/panel.guard';
import { ManagePublicationsComponent } from './components/publication/manage-publications/manage-publications.component';
import { CreatePublicationComponent } from './components/publication/create-publication/create-publication.component';
import { UpdatePublicationComponent } from './components/publication/update-publication/update-publication.component';
import { ManageProductsComponent } from './components/product/manage-products/manage-products.component';
import { CreateProductComponent } from './components/product/create-product/create-product.component';
import { UpdateProductComponent } from './components/product/update-product/update-product.component';
import { ViewProductComponent } from './components/product/view-product/view-product.component';
import { authGuard } from './guards/guards-components/auth.guard';
import { update_profile_guard } from './guards/role-guards/update-profile';
import { SearchComponent } from './components/view/search/search.component';
import { CreateOrderComponent } from './components/order/create-order/create-order.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ViewOrderComponent } from './components/order/view-order/view-order.component';
import { ViewOrdersComponent } from './components/order/view-orders/view-orders.component';
import { ManageOrdersComponent } from './components/order/manage-orders/manage-orders.component';
import { SuggestedProductPricesComponent } from './components/view/suggested-product-prices/suggested-product-prices/suggested-product-prices.component';
import { UpdateOrderComponent } from './components/order/update-order/update-order.component';
import { CreateProductsComponent } from './components/product/create-products/create-products.component';
import { ViewProductsComponent } from './components/product/view-products/view-products.component';
import { grocerGuestGuard } from './guards/role-guards/grocer-guest.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [homeGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [authGuard]
  },
  {
    path: 'loader',
    component: LoaderComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    component: ViewProfileComponent,
    canActivate: [expiredTokenGuard, profileGuard],
    canDeactivate: [profileUploadImageGuard]
  },
  {
    path: 'update-profile/:id',
    component: UpdateProfileComponent,
    canActivate: [update_profile_guard],
  },
  {
    path: 'change-password-profile',
    component: ChangePasswordComponent
  },
  {
    path: 'viewAllGrocers',
    component: ViewAllGrocersComponent
  },
  {
    path: 'viewAllcompanies',
    component: ViewAllCompaniesComponent,
    canActivate: [homeGuard]
  },
  {
    path: 'profile/company/:id',
    component: ViewProfileCompanyComponent,
    canActivate: [expiredTokenGuard, profileCompanyGuard],

  },
  {
    path: 'profile/provider/:id',
    component: ViewProfileProviderComponent,
    canActivate: [expiredTokenGuard, profileProviderGuard]
  },
  {
    path: 'profile/grocer/:id',
    component: ViewProfileGrocerComponent,
    canActivate: [expiredTokenGuard, profileGrocerGuard]
  },
  {
    path: 'delete/data/grocer/:id',
    component: DeleteDataProfileGrocerComponent // Eliminar componente cuando se haga limpieza
  },
  {
    path: 'panel',
    component: PanelComponent,
    canActivate: [panelGuard]
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
  {
    path: 'viewAllProducts',
    component: ViewAllProductsComponent,
    canActivate: [homeGuard] // Revisar, probablemente se elimine esto, es similar a la implementación de productos del search
  },
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
    component: CreateOrderComponent
  },
  {
    path: 'view/orders',
    component: ViewOrdersComponent
  },
  {
    path: 'view/order/:id',
    component: ViewOrderComponent
  },
  {
    path: 'manage/orders',
    component: ManageOrdersComponent
  },
  {
    path: 'update/order/:id',
    component: UpdateOrderComponent
  },
  {
    path: 'view/price/products',
    component: SuggestedProductPricesComponent
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
