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
import { unsavedChanges } from './guards/guards-components/unsavedChanges';
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
    component : LoaderComponent
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
    canDeactivate: [unsavedChanges]
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
    component: DeleteDataProfileGrocerComponent // Eliminar
  },
  {
    path: 'panel',
    component: PanelComponent,
    canActivate: [panelGuard]
  },
  {
    path: 'manage/providers',
    component: ManageProvidersComponent
  },
  {
    path: 'create/provider',
    component: CreateProviderComponent,
    canActivate: [companyGuard]
  },
  {
    path: 'update/provider/:id',
    component: UpdateProviderComponent
  },
  {
    path: 'manage/publications',
    component: ManagePublicationsComponent
  },
  {
    path: 'create/publication',
    component: CreatePublicationComponent
  },
  {
    path: 'update/publication/:id',
    component: UpdatePublicationComponent
  },
  {
    path: 'manage/products',
    component: ManageProductsComponent
  },
  {
    path: 'create/product',
    component: CreateProductComponent
  },
  {
    path: 'update/product/:id',
    component: UpdateProductComponent
  },
  {
    path: 'view/product/:id',
    component: ViewProductComponent
  },
  {
    path: 'viewAllProducts',
    component: ViewAllProductsComponent,
    canActivate: [homeGuard]
  },
  {
    path: 'search/:value',
    component: SearchComponent
  },
  {
    path: 'create/order',
    component: CreateOrderComponent
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
