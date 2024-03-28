import { AuthService } from "src/app/services/auth/auth.service"
import { Router } from "@angular/router";
import { inject } from "@angular/core";

export const guestGuard = () => {

    const router = inject(Router);
    const auth = inject(AuthService);

    let guest;

    auth.isLoggedIn().subscribe(value => {
        guest = value;
    });

    if (!(guest)) {
        return true;
    }

    router.navigate(['404']);
    return false;
}