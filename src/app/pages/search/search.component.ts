import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../config/config';
import { User } from '../../models/user.model';
import { Medic } from '../../models/medic.model';
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  users: User[] = [];
  medics: Medic[] = [];
  hospitals: Hospital[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient,
  ) {
    activatedRoute.params
      .subscribe( params => {
        const term = params['term'];
        this.search( term );
      });
  }

  ngOnInit() {
  }

  search( term: string ) {

    const url = API_URL + '/search/all/' + term;

    this.http.get( url )
      .subscribe( (res: any) => {
        this.hospitals = res.hospitals;
        this.users = res.users;
        this.medics = res.medics;
      });
  }

}
