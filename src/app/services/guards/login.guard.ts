import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    public _userService: UserService,
    public router: Router
  ) {}

  canActivate(): boolean {

    if ( this._userService.isLoggedIn() ) {
      console.log('Paso');
      return true;
    } else {
      console.log('NO Paso');
      this.router.navigate(['/login']);
      return false;
    }

  }
}
