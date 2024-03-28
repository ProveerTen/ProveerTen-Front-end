import { AuthService } from "src/app/services/auth/auth.service"
import { Router } from "@angular/router";
import { inject } from "@angular/core";

export const companyProviderGuard = () => {

    const router = inject(Router);
    const auth = inject(AuthService);

    let isCompany;
    let isProvider;

    auth.isCompany().subscribe(value => {
        isCompany = value;
    });

    auth.isProvider().subscribe(value => {
        isProvider = value;
    });

    if (isCompany || isProvider) {
        return true;
    }

    router.navigate(['404']);
    return false;
}