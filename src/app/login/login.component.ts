import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  rememberme: boolean = false;
  email: string;

  auth2: any;

  constructor(
    public router: Router,
    public _userService: UserService,
  ) { }

  ngOnInit() {
    init_plugins();

    this.googleInit();

    this.email = localStorage.getItem('email') || '';

    if ( this.email.length > 1 ) {
      this.rememberme = true;
    }
  }

  googleInit() {
    gapi.load('auth2',  () => {
      this.auth2 = gapi.auth2.init({
        client_id: '973435820238-87pokb40u9o4o9k2oqumi39sms6kqaf8.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile'
      });
      this.attachSignIn( document.getElementById('btnGoogle') );
    });

  }

  attachSignIn( element ) {
    this.auth2.attachClickHandler( element, {}, (googleUser) => {
      const token = googleUser.getAuthResponse().id_token;

      this._userService.loginGoogle( token )
        .subscribe( () => window.location.href = '#/dashboard');
    });
  }

  login( form: NgForm ) {

    if ( form.invalid ) {
      return;
    }

    const user = new User( null, form.value.email, form.value.password);

    this._userService.login( user, form.value.rememberme )
      .subscribe( res => this.router.navigate(['/dashboard']));
  }

}
