import { AuthService } from "src/app/services/auth/auth.service"
import { Router } from "@angular/router";
import { inject } from "@angular/core";

export const authGuard = () => {

    const router = inject(Router);
    const auth = inject(AuthService);

    let isOnline;

    auth.isLoggedIn().subscribe(value => {
        isOnline = value;
    });

    if (!isOnline) {
        return true;
    }

    router.navigate(['404']);
    return false;
}