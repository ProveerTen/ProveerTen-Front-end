import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { GrocerInfoComponent } from './grocer-info/grocer-info.component';
import { SupplierInfoComponent } from './supplier-info/supplier-info.component';


const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'grocer-info', component: GrocerInfoComponent },
  { path: 'supplier-info', component: SupplierInfoComponent },
];


@NgModule({
  declarations: [
    RegisterComponent,
    GrocerInfoComponent,
    SupplierInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
