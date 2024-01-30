import { AuthService } from "src/app/services/auth/auth.service"
import { Router } from "@angular/router";
import { inject } from "@angular/core";

export const companyGuard = () => {

    const router = inject(Router);
    const auth = inject(AuthService);

    let isCompany;

    auth.isCompany().subscribe(value => {
        isCompany = value;
    });

    if (isCompany) {
        return true;
    }

    router.navigate(['404']);
    return false;
}