import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.css']
})
export class CreateProductsComponent {

  form: FormGroup;
  // form_products: FormGroup;
  file: any;
  imagePreview: any;
  isValidFile: boolean = true;

  products_file: any;
  list_products: any;

  constructor(
    private fb: FormBuilder,
    private client: ClientService,
    public auth: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      file: [null, [Validators.required]],
    });
    // this.form_products = this.fb.group({
    //   name_product: [
    //     '',
    //     [
    //       Validators.required,
    //       Validators.minLength(1),
    //       Validators.maxLength(100),
    //     ],
    //   ],
    //   description_product: [
    //     '',
    //     [
    //       Validators.required,
    //       Validators.minLength(1),
    //       Validators.maxLength(200),
    //     ],
    //   ],
    //   purchase_price_product: ['', [Validators.required]],
    //   unit_purchase_price_product: ['', [Validators.required]],
    //   suggested_unit_selling_price_product: [''],
    //   purchase_quantity: ['', [Validators.required]],
    //   stock_product: ['', [Validators.required]],
    //   content_product: [
    //     '',
    //     [
    //       Validators.required,
    //       Validators.minLength(1),
    //       Validators.maxLength(50),
    //     ],
    //   ],
    //   image_product: ['', [Validators.required]],
    //   category: ['', [Validators.required]],
    //   subcategory: ['', [Validators.required]],
    // });
  }

  onSubmit(): void {

    if (this.form.valid && this.isValidFile) {
      this.isValidFile = false;

      const formData = new FormData();
      formData.append('file_products', this.file);

      this.client.postRequest(`${environment.url_logic}/product/getfileProducts`, formData, undefined, { Authorization: `Bearer ${this.auth.getToken()}` }).subscribe({
        next: (response: any) => {
          console.log(response.data);
          this.products_file = response.data;
          this.list_products = this.products_file;
          this.messageService.add({ key: 'center', severity: 'success', summary: 'Éxito', detail: '¡Archivo cargado exitosamente!' });

        },
        error: (error) => {
          console.log(error);
          this.messageService.add({ key: 'center', severity: 'error', summary: 'Error', detail: '¡Error al cargar el archivo!' });
        },
        complete: () => console.log('complete'),
      });
    }

  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    if (this.file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || this.file.type === 'text/csv' || this.file.type === 'application/vnd.ms-excel') {
      console.log('Archivo válido');
      this.isValidFile = true;
    } else {
      console.log('Archivo no válido');
      this.isValidFile = false;
      this.messageService.add({ key: 'center', severity: 'warn', summary: 'Advertencia', detail: 'Los tipo de archivo ingresado es inválido. Por favor, subir un archivo de excel o un csv.' });
    }
  }

  confirm() {
    this.client.postRequest(`${environment.url_logic}/product/fileProducts`, { data: this.products_file }, undefined, { Authorization: `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        console.log(response);
        this.messageService.add({ key: 'center', severity: 'success', summary: 'Éxito', detail: '¡Productos creados exitosamente!' });
      },
      error: (error) => {
        console.log(error);
        this.messageService.add({ key: 'center', severity: 'error', summary: 'Error', detail: '¡Error en la creación de productos por favor revisa que este bien la plantilla de los productos!' });
      },
      complete: () => console.log('complete'),
    });
  }

}
