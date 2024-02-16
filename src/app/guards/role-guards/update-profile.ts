import { AuthService } from "src/app/services/auth/auth.service";
import { inject } from "@angular/core";
import { Router } from "@angular/router";


export const update_profile_guard = () => {

    const router = inject(Router)
    const auth = inject(AuthService)

    let isCompany, isGrocer;

    auth.isCompany().subscribe((value) => {
        isCompany = value
    })

    auth.isGrocer().subscribe((value) => {
        isGrocer = value
    })

    if (isCompany || isGrocer) {
        return true
    }

    router.navigate(['404'])
    return false
}