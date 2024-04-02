import { AuthService } from "src/app/services/auth/auth.service"
import { Router } from "@angular/router";
import { inject } from "@angular/core";

export const homeGuard = () => {

    const router = inject(Router);
    const auth = inject(AuthService);

    let isGrocer;
    let isOffline;

    auth.isGrocer().subscribe(value => {
        isGrocer = value;
    });

    auth.isLoggedIn().subscribe(value => {
        isOffline = value;
    });

    if (isGrocer || !(isOffline)) {
        return true;
    }

    router.navigate(['panel']);

    return false;
}