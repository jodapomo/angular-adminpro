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
      return true;
    } else {
      console.log('NOT passed login guard');
      this.router.navigate(['/login']);
      return false;
    }

  }
}
