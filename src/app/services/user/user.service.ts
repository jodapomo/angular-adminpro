import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/config/config';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { UploadFileService } from '../upload-file/upload-file.service';
import { throwError } from 'rxjs';

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  token: string;
  menu: any[] = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _uploadService: UploadFileService,
  ) {
    this.loadStorage();
  }

  renewToken() {

    let url = API_URL + 'login/renewtoken';
    url += '?token=' + this.token;

    return this.http.get( url )
      .pipe( map( (res: any) => {

        this.token = res.token;
        localStorage.setItem('token', this.token);

        return true;
      }), catchError( err => {
        this.router.navigate(['/login']);
        swal('The token could not be renewed', '', 'error');
        return throwError(err);
      }));

  }

  isLoggedIn() {
    return ( this.token.length > 5 ) ? true : false;
  }

  loadStorage() {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.user = null;
      this.menu = [];
    }
  }

  saveStorage( id: string, token: string, user: User, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.user = user;
    this.token = token;
    this.menu = menu;
  }

  logout() {

    if ( this.user.google ) {
      gapi.load('auth2',  () => {

        const auth2 = gapi.auth2.getAuthInstance();

        if ( auth2 ) {

          auth2.signOut().then(function () {
            console.log('User signed out.');
          });

        }
      });

    }

    this.user = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);

  }

  loginGoogle( token: string ) {
    const url = API_URL + '/login/google';

    return this.http.post( url, { token } )
      .pipe( map( (res: any) => {
        this.saveStorage( res.id, res.token, res.user, res.menu );
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
        this.saveStorage( res.id, res.token, res.user, res.menu );
        return true;
      }), catchError( err => {

        swal('Error login', err.error.message, 'error');
        return throwError(err);
      }));

  }

  createUser( user: User ) {

    const url = API_URL + '/users';

    return this.http.post( url, user )
      .pipe( map( (res: any) => {
        swal('User created', user.email, 'success');
        return res.user;
      }), catchError( err => {
        swal(err.error.message, err.error.errors.message, 'error');
        return throwError(err);
      }));

  }

  updateUser( user: User ) {

    let url = API_URL + '/users/' + user._id;

    url += '?token=' + this.token;

    return this.http.put( url, user )
      .pipe( map( (res: any) => {

        if ( user._id === this.user._id ) {
          const userDB: User = res.user;
          this.saveStorage( userDB._id, this.token, userDB, this.menu );
        }

        swal('User updated', user.name, 'success');

        return true;
      }), catchError( err => {
        swal(err.error.message, err.error.errors.message, 'error');
        return throwError(err);
      }));

  }

  changeImage( file: File, id: string ) {

    this._uploadService.uploadFile( file, 'users', id)
      .then( (res: any) => {
        this.user.img = res.updatedUser.img;
        swal( 'User image updated', this.user.name, 'success');
        this.saveStorage( id, this.token, this.user, this.menu );
      })
      .catch( err => {
        console.log(err);
      });

  }

  loadUsers( offset: number = 0 ) {
    const url = API_URL + '/users?offset=' + offset;

    return this.http.get(url);
  }

  searchUsers( term: string ) {
    const url = API_URL + '/search/users/' + term;

    return this.http.get(url)
      .pipe( map( (res: any) => res.users) );
  }

  deleteUser( id: string ) {

    let url = API_URL + '/users/' + id;
    url += '?token=' + this.token;

    return this.http.delete( url )
      .pipe( map( res => {
        swal('User has been deleted!', {
          icon: 'success',
        });
        return true;
      }) );

  }

}
