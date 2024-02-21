
import { CanDeactivateFn } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from "@angular/core";

export const unsavedChanges: CanDeactivateFn<unknown> = (component: any, currentRoute, currentState, nextState) => {

    const auth = inject(AuthService);
  
    let isLogged;
    auth.isLoggedIn().subscribe(e => isLogged = e);
  
    if (isLogged) {
      if (component?.unsavedChanges) {
        const confirmation = confirm('¿Seguro qué desea saliru?');
        if (confirmation) {
          return true;
        } else {
          return false;
        }
      }
    }
    return true;
  };