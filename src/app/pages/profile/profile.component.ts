import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/service.index';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  user: User;
  imageToUpload: File;
  imageUrlTemp: any;

  constructor(
    public _userService: UserService,
  ) {
    this.user = this._userService.user;
  }

  ngOnInit() {
  }

  save( user: User ) {
    this.user.name = user.name;

    if ( !this.user.google ) {
      this.user.email = user.email;
    }

    this._userService.updateUser( this.user )
      .subscribe();
  }

  selectImage( file: File ) {
    if ( !file ) {
      this.imageToUpload = null;
      return;
    }

    if ( file.type.indexOf('image') < 0 ) {
      swal('Only images', 'File selected is not an image', 'error');
      this.imageToUpload = null;
      return;
    }

    this.imageToUpload = file;

    const reader  = new FileReader();
    const imageUrlTemp = reader.readAsDataURL( file );

    reader.onloadend = () => this.imageUrlTemp = reader.result;

  }

  changeImage() {

    this._userService.changeImage( this.imageToUpload, this.user._id );

  }

}
