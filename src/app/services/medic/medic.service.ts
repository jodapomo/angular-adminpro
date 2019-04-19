import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../config/config';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import swal from 'sweetalert';
import { Medic } from 'src/app/models/medic.model';

@Injectable({
  providedIn: 'root'
})
export class MedicService {

  count: number = 0;

  constructor(
    public http: HttpClient,
    public _userService: UserService
  ) { }

  loadMedics() {
    const url = API_URL + '/medics';

    return this.http.get( url )
      .pipe( map( (res: any) => {
        this.count = res.count;
        return res.medics;
      }));
  }

  getMedic( id: string ) {
    const url = API_URL + '/medics/' + id;

    return this._userService.http.get(url)
      .pipe( map( (res: any) => res.medic ) );
  }

  searchMedics( term: string ) {
    const url = API_URL + '/search/medics/' + term;

    return this.http.get(url)
      .pipe( map( (res: any) => res.medics) );
  }

  deleteMedic( id: string ) {
    let url = API_URL + '/medics/' + id;
    url += '?token=' + this._userService.token;

    return this.http.delete( url )
      .pipe( map( res => {
        swal('Medic deleted', '', 'success');
        return res;
      }));
  }

  saveMedic( medic: Medic ) {

    let url = API_URL + '/medics';

    if ( medic._id ) {
      url += '/' + medic._id;
      url += '?token=' + this._userService.token;

      return this.http.put(url, medic)
      .pipe( map( (res: any) => {
        swal('Medic updated', medic.name, 'success');
        return res.medic;
      }));

    } else {

      url += '?token=' + this._userService.token;
      return this.http.post(url, medic)
      .pipe( map( (res: any) => {
        swal('Medic created', medic.name, 'success');
        return res.medic;
      }));

    }


  }
}
