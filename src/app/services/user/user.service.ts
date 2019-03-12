import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
  ) {
    this.loadStorage();
  }

  isLoggedIn() {
    return ( this.token.length > 5 ) ? true : false;
  }

  loadStorage() {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this.token = '';
      this.user = null;
    }
  }

  saveStorage( id: string, token: string, user: User) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.user = user;
    this.token = token;
  }

  logout() {
    console.log(this.user.google);
    if ( this.user.google ) {
      gapi.load('auth2',  () => {

        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          console.log('User signed out.');
        });
      });

    }

    this.user = null;
    this.token = '';
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.router.navigate(['/login']);

  }

  loginGoogle( token: string ) {
    const url = API_URL + '/login/google';

    return this.http.post( url, { token } )
      .pipe( map( (res: any) => {
        this.saveStorage( res.id, res.token, res.user );
        return true;
      }));

  }

  login( user: User, rememberme: boolean = false ) {

    if ( rememberme ) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = API_URL + '/login';

    return this.http.post( url, user )
      .pipe( map( (res: any ) => {
        this.saveStorage( res.id, res.token, res.user );
        return true;
      }));

  }

  createUser( user: User ) {

    const url = API_URL + '/users';

    return this.http.post( url, user )
      .pipe( map( (res: any) => {
        swal('User created', user.email, 'success');
        return res.user;
      }));

  }

}
