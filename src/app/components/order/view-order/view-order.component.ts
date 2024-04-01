import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { SharedService } from 'src/app/services/shared/shared.service'; 
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {

  form: FormGroup;
  data_order: any;
  order: any;
  id: any;

  is_selected: boolean = false;

  options: any = [
    { id: 1, name: 'Creado' },
    { id: 2, name: 'En proceso' },
    { id: 3, name: 'En reparto' },
    { id: 3, name: 'Finalizado' }
  ]

  constructor(private client: ClientService, public auth: AuthService, private fb: FormBuilder, private router: Router, private routerActivate: ActivatedRoute, private shared: SharedService,
    private messageService: MessageService) {
    this.form = this.fb.group({
      option: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.id = this.routerActivate.snapshot.params['id'];
    this.client.postRequest(`${environment.url_logic}/order/detail`, { id_order: this.id }, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        console.log(response);
        this.data_order = response.order;
        this.order = response.order_detail;
        console.log(this.data_order);
        console.log(this.order);

        this.form.patchValue({
          option: this.data_order[0].status
        });

        if (this.data_order[0].status === 'En proceso') {
          this.options.splice(0, 1);
        } else if (this.data_order[0].status === 'En reparto') {
          this.options.splice(0, 2);
        } else if (this.data_order[0].status === 'Finalizado') {
          this.options.splice(0, 3);
          this.form.get('option')!.disable();
        }

      },
      error: (error) => {
        console.log(error.error.Status);
      },
      complete: () => console.log('complete'),
    });
  }

  selectedOption(value: any) {
    if (value === this.data_order[0].status) {
      this.is_selected = false;
      return;
    }
    this.is_selected = true;
  }

  deleteOrder() {
    this.id = this.routerActivate.snapshot.params['id'];
    let option = confirm('¿Seguro qué desea eliminar el pedido?');
    if (option) {
      this.client.postRequest(`${environment.url_logic}/order/delete`, { id_order: this.id }, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
        next: (response: any) => {
          this.messageService.add({ key: 'center', severity: 'success', summary: 'Éxito', detail: '¡Pedido eliminado exitosamente!' });
          this.router.navigate(['view/orders'])
        },
        error: (error) => {
          console.log(error.error.Status);  
          this.messageService.add({ key: 'center', severity: 'error', summary: 'Error', detail: '¡Error en la eliminación del pedido!' });
        },
        complete: () => console.log('complete'),
      });
    }
  }

  goBack(role: string) {
    if (role === 'grocer') {
      this.router.navigate(['view/orders'])
      return;
    }
    this.router.navigate(['manage/orders'])
  }

  onSubmit() {
    let option = confirm('¿Seguro que desea cambiar el estado del pedido?');
    if (option) {
      this.client.postRequest(`${environment.url_logic}/order/update/status`, { id_order: this.id, status: this.form.value.option }, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
        next: (response: any) => {
          console.log(response);
          window.location.reload();
        },
        error: (error) => {
          console.log(error.error.Status);
        },
        complete: () => console.log('complete'),
      });
    }
  }

}
