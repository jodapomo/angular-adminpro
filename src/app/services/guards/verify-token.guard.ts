import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class VerifyTokenGuard implements CanActivate {

  constructor(
    public _userService: UserService,
    public router: Router,
  ) {}

  canActivate(): Promise<boolean> | boolean {

    const token = this._userService.token;
    const payload = JSON.parse( atob( token.split('.')[1] ) );

    const expired = this.expired( payload.exp );

    if ( expired ) {
      return false;
    }



    return this.verifyRenew(payload.exp);
  }

  verifyRenew( exp: number ): Promise<boolean> {

    return new Promise( (resolve, reject) => {
      const tokenExp = new Date( exp * 1000);
      const now = new Date();

      now.setTime( now.getTime() + (1 * 60 * 60 * 1000));

      if ( tokenExp.getTime() > now.getTime() ) {
        resolve( true );
      } else {
        this._userService.renewToken()
          .subscribe( () => {
            resolve(true);
          },  () => {
            reject(false);
            this.router.navigate(['/login']);
          });
      }
    });
  }


  expired( exp: number ) {

    const now = new Date().getTime() / 1000;

    if ( exp < now ) {
      this.router.navigate(['/login']);
      return true;
    } else {
      return false;
    }

  }
}
