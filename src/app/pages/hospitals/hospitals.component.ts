import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import swal from 'sweetalert';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: []
})
export class HospitalsComponent implements OnInit {

  hospitals: Hospital[] = [];


  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService,
  ) { }

  ngOnInit() {
    this.loadHospitals();

    this._modalUploadService.notification
      .subscribe( () => this.loadHospitals());
  }

  searchHospitals( term: string ) {

    if ( term.length <= 0 ) {
      this.loadHospitals();
      return;
    }

    this._hospitalService.searchHospital( term )
      .subscribe( hospitals => this.hospitals = hospitals );
  }

  loadHospitals() {
    this._hospitalService.loadHospitals()
      .subscribe( hospitals => {this.hospitals = hospitals; console.log(hospitals); });
  }

  saveHospital( hospital: Hospital) {

    this._hospitalService.updateHospital( hospital )
      .subscribe();

  }

  deleteHospital( hospital: Hospital) {

    this._hospitalService.deleteHospital( hospital._id )
      .subscribe( () => this.loadHospitals() );

  }

  createHospital() {
    swal({
      title: 'Create Hospital',
      text: 'Enter the name of the hospital',
      content: {

        element: 'input',

        attributes: {

          placeholder: '',

          type: 'text',
        }
      },
      icon: 'info',
      buttons: ['Cancel', 'Create'],
      dangerMode: true,
    }).then( (value: string) => {
      if ( !value || value.length === 0 ) {
        return;
      }

      this._hospitalService.createHospital( value )
        .subscribe( () => this.loadHospitals() );
    });
  }

  updateImage( hospital: Hospital ) {

    this._modalUploadService.showModal('hospitals', hospital._id, hospital.img);

  }

}
