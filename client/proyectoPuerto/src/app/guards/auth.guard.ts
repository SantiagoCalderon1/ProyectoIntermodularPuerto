import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { inject } from '@angular/core';


export const authGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  const _loginService = inject(LoginService);

  if (!_loginService.isLoggedIn()) {
    _router.navigateByUrl('/login');
    return false;
  }

  return true;
};
