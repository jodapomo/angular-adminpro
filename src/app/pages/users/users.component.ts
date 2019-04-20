import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  offset: number = 0;

  count: number = 0;
  loading: boolean = true;

  constructor(
    public _userService: UserService,
    public _modalUploadService: ModalUploadService,
  ) { }

  ngOnInit() {
    this.loadUsers();

    this._modalUploadService.notification
      .subscribe( resp => {
        this.loadUsers();
      });
  }

  showModal( id: string, img: string ) {
    this._modalUploadService.showModal( 'users', id, img );
  }

  loadUsers() {

    this.loading = true;

    this._userService.loadUsers( this.offset )
      .subscribe( (res: any) => {
        this.count = res.count;
        this.users = res.users;
        this.loading = false;
      });
  }

  changeOffset( value: number ) {
    const offset = this.offset + value;

    if ( offset >= this.count ) {
      return;
    }

    if ( offset < 0 ) {
      return;
    }

    this.offset += value;
    this.loadUsers();
  }

  searchUsers( term: string ) {

    if ( term.length <= 0 ) {
      this.loadUsers();
      return;
    }

    this.loading = true;

    this._userService.searchUsers( term )
      .subscribe(  (users: User[]) => {
        this.users = users;
        this.loading = false;
      });
  }

  deleteUser( user: User ) {

    if ( user._id === this._userService.user._id ) {
      swal('Cannot delete this user', 'You cannot delete yourself', 'error');
      return;
    }

    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover ' + user.name + '\'s account!',
      icon: 'warning',
      buttons: ['No', 'Yes'],
      dangerMode: true,
    })
    .then( willDelete => {

      if (willDelete) {

        this._userService.deleteUser( user._id )
          .subscribe( (deleted: boolean) => {
            this.loadUsers();
          });
      }

    });

  }

  saveUser( user: User ) {

    this._userService.updateUser( user )
      .subscribe();

  }

}
