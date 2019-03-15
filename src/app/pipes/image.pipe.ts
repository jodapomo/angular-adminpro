import { Pipe, PipeTransform } from '@angular/core';
import { API_URL } from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: any, type: string = 'user'): any {

    let url = API_URL + '/img';

    if ( !img ) {
      return url + '/users/xxx';
    }

    if ( img.indexOf('https') >= 0 ) {
      return img;
    }

    switch ( type ) {
      case 'user':
        url += '/users/' + img;
        break;
      case 'medic':
        url += '/medics/' + img;
        break;
      case 'hospital':
        url += '/hospitals/' + img;
        break;

      default:
        console.log('Image type not valid. Valid type: user, medic, hospital');
        url += '/users/xxx';
        break;

    }

    return url;
  }

}
