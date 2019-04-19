import { Component, OnInit } from '@angular/core';
import { Medic } from '../../models/medic.model';
import { MedicService } from '../../services/medic/medic.service';

@Component({
  selector: 'app-medics',
  templateUrl: './medics.component.html',
  styles: []
})
export class MedicsComponent implements OnInit {

  medics: Medic[] = [];

  constructor(
    public _medicService: MedicService
  ) { }

  ngOnInit() {
    this.loadMedics();
  }

  loadMedics() {
    this._medicService.loadMedics()
      .subscribe( medics => this.medics = medics );
  }

  searchMedics( term: string ) {

    if ( term.length <= 0 ) {
      this.loadMedics();
      return;
    }

    this._medicService.searchMedics( term )
      .subscribe( medics => this.medics = medics );
  }

  deleteMedic( medic: Medic ) {
    this._medicService.deleteMedic( medic._id )
      .subscribe( () => this.loadMedics());
  }

}
