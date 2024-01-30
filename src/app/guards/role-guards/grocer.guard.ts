import { AuthService } from "src/app/services/auth/auth.service"
import { Router } from "@angular/router";
import { inject } from "@angular/core";

export const grocerGuard = () => {

    const router = inject(Router);
    const auth = inject(AuthService);

    let isGrocer;

    auth.isGrocer().subscribe(value => {
        isGrocer = value;
    });

    if (isGrocer) {
        return true;
    }

    router.navigate(['404']);
    return false;
}