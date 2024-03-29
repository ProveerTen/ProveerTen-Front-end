import { AuthService } from "src/app/services/auth/auth.service"
import { Router } from "@angular/router";
import { inject } from "@angular/core";

export const userGuard = () => {

    const router = inject(Router);
    const auth = inject(AuthService);

    let isOffline;

    auth.isLoggedIn().subscribe(value => {
        isOffline = value;
    });

    if (isOffline) {
        return true;
    }

    router.navigate(['404']);
    return false;
}