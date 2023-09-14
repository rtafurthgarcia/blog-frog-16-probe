import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';
import { map } from 'rxjs';
import { hasRole } from './jwt';

// a whole function is exported !
export const authenticationGuard: CanActivateFn = () => {
  const oidcSecurityService = inject(OidcSecurityService);
  const router = inject(Router);

  return oidcSecurityService.checkAuth().pipe(
    map((loginResponse: LoginResponse) => {
      if (
        loginResponse.isAuthenticated &&
        hasRole('user', loginResponse.accessToken)
      ) {
        return true;
      } else {
        router.navigate(["denied"]);
        //oidcSecurityService.authorize();
        return false;
      }
    })
  );
};
