import { AuthService } from "src/app/services/auth/auth.service"
import { Router } from "@angular/router";
import { inject } from "@angular/core";

export const providerGuard = () => {

    const router = inject(Router);
    const auth = inject(AuthService);

    let isProvider;

    auth.isProvider().subscribe(value => {
        isProvider = value;
    });

    if (isProvider) {
        return true;
    }

    router.navigate(['404']);
    return false;
}