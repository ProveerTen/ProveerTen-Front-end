import { AuthService } from "src/app/services/auth/auth.service"
import { Router } from "@angular/router";
import { inject } from "@angular/core";

export const grocerProviderGuestGuard = () => {

    const router = inject(Router);
    const auth = inject(AuthService);

    let isGrocer;
    let isProvider;
    let isOffline;

    auth.isGrocer().subscribe(value => {
        isGrocer = value;
    });

    auth.isProvider().subscribe(value => {
        isProvider = value;
    });

    auth.isLoggedIn().subscribe(value => {
        isOffline = value;
    });

    console.log(isGrocer || isProvider || !(isOffline));

    if (isGrocer || isProvider || !(isOffline)) {
        return true;
    }

    router.navigate(['404']);
    return false;
}