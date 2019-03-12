import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/service.index';

import swal from 'sweetalert';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    public _userService: UserService,
    public router: Router,
  ) { }

  checkEquality( field1: string, field2: string ) {
    return ( group: FormGroup ) => {

      const pass1 = group.controls[field1].value;
      const pass2 = group.controls[field2].value;

      if ( pass1 === pass2 ) {

        return null;

      } else {

        return {
          notEqual: true
        };

      }
    };
  }

  ngOnInit() {
    init_plugins();

    this.form = new FormGroup({
      name: new FormControl( null, Validators.required ),
      email: new FormControl( null, [ Validators.required, Validators.email ] ),
      password: new FormControl( null, Validators.required ),
      password2: new FormControl( null, Validators.required ),
      terms: new FormControl( false ),
    }, { validators: this.checkEquality( 'password', 'password2' ) } );


    this.form.setValue({
      name: 'Jose',
      email: 'test@test.com',
      password: '1234',
      password2: '1234',
      terms: true,
    });

  }

  signup() {

    if ( this.form.invalid ) {
      return;
    }

    if ( !this.form.value.terms ) {
      swal('Important', 'You must accept the terms and conditions', 'warning');
      return;
    }

    const user = new User(
      this.form.value.name,
      this.form.value.email,
      this.form.value.password,
    );

    this._userService.createUser( user )
      .subscribe( res => this.router.navigate(['/login']) );

  }

}
