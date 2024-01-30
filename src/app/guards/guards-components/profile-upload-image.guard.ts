import { CanDeactivateFn } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from "@angular/core";

export const profileUploadImageGuard: CanDeactivateFn<unknown> = (component: any, currentRoute, currentState, nextState) => {

  const auth = inject(AuthService);

  let isLogged;
  auth.isLoggedIn().subscribe(e => isLogged = e);

  if (isLogged) {
    if (component?.photo || component?.cover) {
      const confirmation = confirm('¿Seguro qué desea salir?');
      if (confirmation) {
        return true;
      } else {
        return false;
      }
    }
  }
  return true;
};
