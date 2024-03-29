import { AuthService } from "src/app/services/auth/auth.service"
import { Router } from "@angular/router";
import { inject } from "@angular/core";

export const grocerCompanyGuard = () => {

    const router = inject(Router);
    const auth = inject(AuthService);

    let isGrocer;
    let isCompany;

    auth.isGrocer().subscribe(value => {
        isGrocer = value;
    });

    auth.isCompany().subscribe(value => {
        isCompany = value;
    });

    if (isGrocer || isCompany) {
        return true;
    }

    router.navigate(['404']);

    return false;
}