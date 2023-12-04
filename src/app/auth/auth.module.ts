import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

// Módulos
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

// Componentes
import { RegisterComponent } from './components/register/register.component';
import { GrocerInfoComponent } from './components/grocer-info/grocer-info.component';
import { SupplierInfoComponent } from './components/supplier-info/supplier-info.component';


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
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }), // ToastrModule added
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
