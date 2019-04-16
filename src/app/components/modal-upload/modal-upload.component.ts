import { Component, OnInit, ViewChild } from '@angular/core';
import swal from 'sweetalert';
import { UploadFileService } from '../../services/upload-file/upload-file.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imageToUpload: File;
  imageUrlTemp: any;

  @ViewChild( 'inputImage' ) inputImage;

  constructor(
    public _uploadFileService: UploadFileService,
    public _modalUploadService: ModalUploadService
  ) {
    console.log('Modal listoooo');
  }

  ngOnInit() {
  }

  closeModal() {
    this.imageUrlTemp = null;
    this.imageToUpload = null;

    this._modalUploadService.hideModal();
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

  uploadImage() {
    this._uploadFileService.uploadFile( this.imageToUpload, this._modalUploadService.type, this._modalUploadService.id )
      .then( resp => {

        this._modalUploadService.notification.emit( resp );

        this.closeModal();
        this.clearInput();

      }).catch((err) => {
        console.log('Error Uploading');
      });
  }

  clearInput() {
    this.inputImage.nativeElement.value = '';
}

}
