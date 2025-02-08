import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../login/login.service';
import { Observable } from 'rxjs';

export class authGuard implements CanActivate {

  constructor(private _loginService: LoginService, private _router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {

    if (this._loginService.isLoggedIn()) {
      return true;
    } else {
      this._router.navigate(['/login']); // Redirige si no tiene permisos
      return false;
    }
  }
}