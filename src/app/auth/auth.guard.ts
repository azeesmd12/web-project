import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../shared/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor(private loginService : LoginService,private router : Router){

}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): boolean {
        if(!this.loginService.isLoggedIn()){
          this.router.navigateByUrl('/signin');
          this.loginService.deleteToken();
          return false;
        }
      return true;
    }


  
}
