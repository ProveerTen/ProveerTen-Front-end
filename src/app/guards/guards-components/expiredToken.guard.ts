import { AuthService } from "src/app/services/auth/auth.service"
import { inject } from "@angular/core";

export const expiredTokenGuard = () => {

    const auth = inject(AuthService);

    if (!(auth.isExpiredToken())) {
        return true;
    }

    auth.logout();
    return false;
}