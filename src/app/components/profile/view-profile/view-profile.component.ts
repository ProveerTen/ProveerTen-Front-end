import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';
import { LoaderComponent } from '../../loader/loader.component';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css'],
})
export class ViewProfileComponent {
  loading: boolean = false;
  data: any;
  publications: any;
  imageFile: any;
  isValidImage: boolean = false;
  cover: boolean = false;
  photo: boolean = false;
  formData = new FormData();

  inputLinkRed: boolean = true;
  valueSocialRed: string = '';
  dataSocialReds: any;
  valid: boolean = false;
  iconSocialRed: any;
  estadoModalIcons: boolean = true;
  colorIcon: any;
  colorsOfIcons: any[] = [];
  // arrow = false

  constructor(
    private client: ClientService,
    public auth: AuthService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.client
      .getRequest(
        `${environment.url_logic}/profile/${this.auth.getRole()}`,
        undefined,
        { Authorization: `Bearer ${this.auth.getToken()}` }
      )
      .subscribe({
        next: (response: any) => {
          this.loading = false;
          this.data = response.data;
          if (this.auth.getRole() === 'company') {
            const foundationDate = new Date(this.data.foundation_company);
            this.data.foundation_company = foundationDate
              .toISOString()
              .split('T')[0];
            this.getPublications();
            this.getSocialReds();
          }
        },
        error: (error) => {
          this.loading = false;
          console.log(error.error.Status);
        },
        complete: () => {
          console.log('complete');
          // this.getSocialReds();
        },
      });
  }

  getPublications() {
    this.loading = true;
    setTimeout(() => {

      this.client
        .getRequest(
          `${environment.url_logic
          }/publication/view/company/${this.auth.getId()}`,
          undefined,
          { Authorization: `Bearer ${this.auth.getToken()}` }
        )
        .subscribe({
          next: (response: any) => {
            this.loading = false
            this.publications = response.publications;

            for (let k = 0; k < this.publications.length; k++) {
              const element = this.publications[k].date;
              this.publications[k].date = new Date(element);
            }
            this.publications = this.orderByDate(this.publications);

            if (this.publications == '') {
              this.publications = false;
            }
          },
          error: (error) => {
            this.loading = false
            console.log(error.error.Status);
          },
          complete: () => console.log('complete'),
        });
    }, 400);
  }

  orderByDate(publications: any[]) {
    return publications.sort((a, b) => b.date - a.date);
  }

  updatePhoto() {
    this.photo = true;
    this.cover = false;
  }

  updateCover() {
    this.cover = true;
    this.photo = false;
  }

  onFileSelected(event: any) {
    this.imageFile = event.target.files[0];
    if (this.imageFile.type.startsWith('image/')) {
      this.isValidImage = true;
    } else {
      this.isValidImage = false;
    }
  }

  onSubmitPhoto() {

    this.loading = true
    if (this.isValidImage) {
      this.isValidImage = false;
      this.formData.append(
        `profile_photo_${this.auth.getRole()}`,
        this.imageFile
      );
      this.client
        .patchRequest(
          `${environment.url_logic}/photo/photoProfile/${this.auth.getRole()}`,
          this.formData,
          undefined,
          { Authorization: `Bearer ${this.auth.getToken()}` }
        )
        .subscribe({
          next: (response: any) => {
            this.loading = false
            this.isValidImage = false;
            console.log(response);
            this.messageService.add({
              key: 'center',
              severity: 'success',
              summary: 'Éxito',
              detail: 'La foto se ha actualizado correctamente.',
            });
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          },
          error: (error) => {
            this.loading = false
            this.messageService.clear();
            this.messageService.add({
              key: 'center',
              severity: 'error',
              summary: 'Error',
              detail: error.error.error,
            });
          },
          complete: () => console.log('complete'),
        });
    } else {
      this.loading = false
      console.log('Error');
      this.messageService.clear();
      this.messageService.add({
        key: 'center',
        severity: 'warn',
        summary: 'Advertencia',
        detail:
          'Los campos ingresados son inválidos. Por favor, revise la información proporcionada.',
      });
    }
  }

  onSubmitCover() {
    this.loading = true
    if (this.isValidImage) {
      this.isValidImage = false;
      this.formData.append(
        `cover_photo_${this.auth.getRole()}`,
        this.imageFile
      );
      this.client
        .patchRequest(
          `${environment.url_logic}/photo/photoCover/${this.auth.getRole()}`,
          this.formData,
          undefined,
          { Authorization: `Bearer ${this.auth.getToken()}` }
        )
        .subscribe({
          next: (response: any) => {
            this.loading = false
            this.isValidImage = false;
            console.log(response);
            this.messageService.add({
              key: 'center',
              severity: 'success',
              summary: 'Éxito',
              detail: 'La foto de portada se ha actualizado correctamente.',
            });
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          },
          error: (error) => {
            this.loading = false
            this.messageService.clear();
            this.messageService.add({
              key: 'center',
              severity: 'error',
              summary: 'Error',
              detail: error.error.error,
            });
          },
          complete: () => console.log('complete'),
        });
    } else {
      console.log('Error');
      this.loading = false
      this.messageService.clear();
      this.messageService.add({
        key: 'center',
        severity: 'warn',
        summary: 'Advertencia',
        detail:
          'Los campos ingresados son inválidos. Por favor, revise la información proporcionada.',
      });
    }
  }

  cancelPhoto() {
    this.photo = false;
    this.formData.delete(`profile_photo_${this.auth.getRole()}`);
  }

  cancelCover() {
    this.cover = false;
    this.formData.delete(`cover_photo_${this.auth.getRole()}`);
  }

  deleteValue(value: string) {
    this.loading = true
    this.client
      .deleteRequest(
        `${environment.url_logic}/edit_profile/${this.auth.getRole()}`,
        { deleteField: `${value}_${this.auth.getRole()}` },
        { Authorization: `Bearer ${this.auth.getToken()}` }
      )
      .subscribe({
        next: (response: any) => {
          this.loading = false
          console.log(response);
          if (value.startsWith('profile')) {
            this.messageService.add({
              key: 'center',
              severity: 'success',
              summary: 'Éxito',
              detail: 'La foto de perfil se ha eliminada correctamente.',
            });
          } else {
            this.loading = false
            this.messageService.add({
              key: 'center',
              severity: 'success',
              summary: 'Éxito',
              detail: 'La foto de portada se ha eliminada correctamente.',
            });
          }
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        },
        error: (error) => {
          this.loading = false
          this.messageService.clear();
          this.messageService.add({
            key: 'center',
            severity: 'error',
            summary: 'Error',
            detail: error.error.error,
          });
        },
        complete: () => console.log('complete'),
      });
  }
  //
  // updateSocialRed() {
  //   this.addSocialRed()
  //   this.inputSocialRed = false
  // }

  addSocialRed() {
    this.inputLinkRed = !this.inputLinkRed;
    this.estadoModalIcons = true;
    this.iconSocialRed = undefined;
    this.valid = false
    this.valueSocialRed = null
  }

  onSubmitSocialRed() {

    this.loading = true
    if (this.valid == false) {
      return;
    } else if (this.valid == true) {
      const data = {
        nit_company: this.auth.getId(),
        link: this.valueSocialRed,
        icon: this.iconSocialRed,
      };
      console.log('data red', data);

      this.client
        .postRequest(
          `${environment.url_logic}/edit_profile/socialRed`,
          data,
          undefined,
          { Authorization: `Bearer: ${this.auth.getToken()}` }
        )
        .subscribe({
          next: (response: any) => {
            this.loading = false
            this.messageService.add({ key: 'center', severity: 'success', summary: 'Éxito', detail: '¡Red social agregada exitosamente!' });
            console.log(response);
            this.addSocialRed();
          },
          error: (error: any) => {
            this.loading = false
            console.log(error);
            this.messageService.add({ key: 'center', severity: 'error', summary: 'Error', detail: '¡Error al agregar la red social!' });
          },
          complete: () => {
            console.log('Complete');
            this.getSocialReds();
            this.valueSocialRed = null;
            this.iconSocialRed = null;
            this.estadoModalIcons = false;
            this.valid = false;
          },
        });
    }
  }

  valueRed(event: any) {
    this.valueSocialRed = event.target.value;
    // if (this.valueSocialRed.length > 2) {
    //   this.valid = true;
    // } else {
    //   this.valid = false;
    // }
    console.log('VALID', this.valid);

    console.log('EVENT', this.valueSocialRed);
    this.validOnSubmit();
  }

  validOnSubmit() {
    console.log(this.valueSocialRed);
    console.log(this.iconSocialRed);

    if (this.iconSocialRed && this.valueSocialRed.length > 4) {
      this.valid = true;
    } else {
      this.valid = false;
    }
    console.log('VAlID', this.valid);
    return this.valid;

    // this.valid = valid
  }
  iconRed(valueIcon: any, colorIcon: any) {
    // this.iconSocialRed = event.target.value
    // console.log("iconSocialRed", this.iconSocialRed);
    this.iconSocialRed = valueIcon;
    console.log('valueIcon', this.iconSocialRed);

    this.colorIcon = colorIcon;
    console.log('index', this.colorIcon);
    this.validOnSubmit();
  }

  OptionsIcons = [
    { value: '<i class="fa-brands fa-facebook"></i>', color: 'color:#1a6eff;' },
    { value: '<i class="fa-brands fa-instagram"></i>', color: 'color:#fe2a90' },
    { value: '<i class="fa-brands fa-youtube"></i>', color: 'color:#ff1414' },
    { value: '<i class="fa-brands fa-whatsapp"></i>', color: 'color:#40a923' },
    { value: '<i class="fa-brands fa-twitch"></i>', color: 'color:#b62eff' },
    { value: '<i class="fa-brands fa-discord"></i>', color: 'color:#5863fe' },
    { value: '<i class="fa-brands fa-twitter"></i>', color: 'color:#2ec0ff' },
    { value: '<i class="fa-brands fa-tiktok"></i>', color: 'color:#000000' },
    {
      value: '<i class="fa-brands fa-google-plus-g"></i>',
      color: 'color:#ff2414',
    },
    { value: '<i class="fa-solid fa-globe"></i>', color: 'color:#e6a800' },
    {
      value: '<i class="fa-solid fa-location-dot"></i>',
      color: 'color:#b30000',
    },
    {
      value: '<i class="fa-solid fa-map-location-dot"></i>',
      color: 'color:#983c25',
    },
    {
      value: '<i class="fa-solid fa-compact-disc"></i>',
      color: 'color:#2a3c5a',
    },
  ];

  getColorIcon() {
    this.dataSocialReds.forEach((element) => {
      let etiqueteIcon = element.icon;
      // console.log("element",etiqueteIcon);

      this.OptionsIcons.forEach((icon) => {
        let value = icon.value;

        if (etiqueteIcon == value) {
          // this.colorIcon = icon.color
          this.colorsOfIcons.push(icon.color);
        }
      });
    });
    console.log(this.colorsOfIcons);
  }

  showModalIcons() {
    this.estadoModalIcons = !this.estadoModalIcons;
    // this.arrow = !this.arrow
  }
  getSocialReds() {

    this.loading = true
    this.client
      .getRequest(
        `${environment.url_logic}/edit_profile/socialRed`,
        undefined,
        { Authorization: `Bearer ${this.auth.getToken()}` }
      )
      .subscribe({
        next: (response: any) => {
          this.loading = false
          this.dataSocialReds = response.status.data;
          console.log('datos de las redes sociales', this.dataSocialReds);
          console.log(this.dataSocialReds.length);
          this.colorsOfIcons = [];
          this.getColorIcon();
        },
        error: (error) => {
          this.loading = false
          console.log(error.error.Status);
        },
        complete: () => {
          console.log('complete');
        },
      });
  }

  onDeleteSocialRed(id: string) {
    // let id = id
    this.loading = true
    console.log('id link', id);
    let res = confirm('¿Seguro qué desea eliminar esta información?');

    if (res) {
      this.client
        .deleteRequest(
          `${environment.url_logic}/edit_profile/socialRed`,
          { id },
          { Authorization: `Bearer ${this.auth.getToken()}` }
        )
        .subscribe({

          next: (response: any) => {
            this.loading = false
            this.dataSocialReds = response.status.data;
            this.messageService.add({ key: 'center', severity: 'success', summary: 'Éxito', detail: '¡Red social eliminada exitosamente!' });
            console.log('datos de las redes sociales', this.dataSocialReds);
            console.log(this.dataSocialReds.length);
          },
          error: (error) => {
            this.loading = false
            console.log(error.error.Status);
            this.messageService.add({ key: 'center', severity: 'error', summary: 'Error', detail: '¡Error en la eliminación de la red social!'});
          },
          complete: () => {
            console.log('complete');
            this.getSocialReds();
          },
        });
    }
  }
}
