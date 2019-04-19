import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../config/config';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import swal from 'sweetalert';
import { Hospital } from '../../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  count: number = 0;

  constructor(
    public http: HttpClient,
    public _userService: UserService,
  ) { }

  loadHospitals() {

    const url = API_URL + '/hospitals';

    return this.http.get( url )
      .pipe( map( (res: any) => {
        this.count = res.count;
        return res.hospitals;
      }));

  }

  getHospital( id: string ) {

    const url = API_URL + '/hospitals/' + id;

    return this.http.get( url )
      .pipe( map( (res: any) => res.hospital));

  }

  deleteHospital( id:string ) {

    let url = API_URL + '/hospitals/' + id;
    url += '?token=' + this._userService.token;

    return this.http.delete( url )
      .pipe( map( (res: any) => {
        swal('Hospital deleted.', '', 'success');
      }));

  }

  createHospital( name: string ) {

    let url = API_URL + '/hospitals';
    url += '?token=' + this._userService.token;

    return this.http.post( url, { name })
      .pipe( map( (res: any) => res.hospital ));

  }

  searchHospital( term: string ) {
    const url = API_URL + '/search/hospitals/' + term;

    return this.http.get(url)
      .pipe( map( (res: any) => res.hospitals ) );
  }

  updateHospital( hospital: Hospital ) {

    let url = API_URL + '/hospitals/' + hospital._id;
    url += '?token=' + this._userService.token;

    return this.http.put( url, hospital)
      .pipe( map( (res: any) => {
        swal('Hospital updated', res.hospital.name, 'success');
        return res.hospital;
      } ));
  }

}
