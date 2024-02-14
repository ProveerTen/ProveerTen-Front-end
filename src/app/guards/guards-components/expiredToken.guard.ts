import { AuthService } from "src/app/services/auth/auth.service"
import { inject } from "@angular/core";

export const expiredTokenGuard = () => {

    let isOffline;

    const auth = inject(AuthService);

    if (!(auth.isExpiredToken())) {
        return true;
    }

    auth.isLoggedIn().subscribe(value => {
        isOffline = value;
    });

    if (!(isOffline)) {
        return true;
    }

    auth.logout();
    return false;
}