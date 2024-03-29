import { AuthService } from "src/app/services/auth/auth.service"
import { Router } from "@angular/router";
import { inject } from "@angular/core";

export const companyProviderGrocerGuard = () => {

    const router = inject(Router);
    const auth = inject(AuthService);

    let isCompany;
    let isProvider;
    let isGrocer;

    auth.isCompany().subscribe(value => {
        isCompany = value;
    });

    auth.isProvider().subscribe(value => {
        isProvider = value;
    });

    auth.isGrocer().subscribe(value => {
        isGrocer = value;
    });

    if (isCompany || isProvider || isGrocer) {
        return true;
    }

    router.navigate(['404']);
    return false;
}