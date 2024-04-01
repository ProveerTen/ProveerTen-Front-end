import { AuthService } from "src/app/services/auth/auth.service"
import { Router } from "@angular/router";
import { inject } from "@angular/core";

export const grocerProviderGuard = () => {

    const router = inject(Router);
    const auth = inject(AuthService);

    let isGrocer;
    let isProvider;

    auth.isGrocer().subscribe(value => {
        isGrocer = value;
    });

    auth.isProvider().subscribe(value => {
        isProvider = value;
    });

    if (isGrocer || isProvider) {
        return true;
    }

    router.navigate(['404']);
    return false;
}