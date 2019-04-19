import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../../models/hospital.model';
import { HospitalService } from '../../../services/hospital/hospital.service';
import { MedicService } from '../../../services/medic/medic.service';
import { Medic } from '../../../models/medic.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medic',
  templateUrl: './medic.component.html',
  styles: []
})
export class MedicComponent implements OnInit {

  hospitals: Hospital[] = [];

  medic: Medic = new Medic('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    public _medicService: MedicService,
    public _hospitalService: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService,
  ) {
    activatedRoute.params.subscribe( params => {
      const id = params['id'];

      if ( id !== 'new' ) {
        this.loadMedic( id );
      }
    });
  }

  ngOnInit() {
    this._hospitalService.loadHospitals()
      .subscribe( hospitals => this.hospitals = hospitals);

    this._modalUploadService.notification
      .subscribe( res => {
        this.medic.img = res.updatedMedic.img;
      });
  }

  saveMedic( f: NgForm ) {

    if ( f.invalid ) {
      return;
    }

    this._medicService.saveMedic( this.medic )
      .subscribe( medic => {
        this.medic = medic;
        this.router.navigate(['/medic', medic._id]);
      });
  }

  loadMedic( id: string ) {
    this._medicService.getMedic(id)
      .subscribe( medic => {

        this.medic = medic;
        this.medic.hospital = medic.hospital._id;
        this.changeHospital( this.medic.hospital );
      });
  }

  changeHospital( id: string ) {

    this._hospitalService.getHospital( id )
      .subscribe( hospital => this.hospital = hospital );

  }

  changeImage() {
    this._modalUploadService.showModal( 'medics', this.medic._id, this.medic.img );
  }

}
