import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public type: string;
  public id: string;

  public hide: string = 'hide';
  public currentImage: string = '';

  public notification = new EventEmitter<any>();

  constructor() {
    console.log('Modal Listo');
  }

  hideModal() {
    this.hide = 'hide';
    this.type = null;
    this.id = null;
  }

  showModal( type: string, id: string, currentImage: string ) {
    this.hide = '';
    this.id = id;
    this.type = type;
    this.currentImage = currentImage;
  }
}
