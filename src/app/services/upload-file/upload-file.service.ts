import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor() { }

  uploadFile( file: File, type: string, id: string ) {

    return new Promise( (resolve, reject) => {

      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append( 'img', file, file.name );

      xhr.onreadystatechange =  () => {
        if ( xhr.readyState === 4 ) {

          if ( xhr.status === 200 ) {
            resolve( JSON.parse(xhr.response ));
          } else {
            console.log('Error uploading');
            reject( xhr.response );
          }
        }

      };

      const url = API_URL + '/upload/' + type + '/' + id;

      xhr.open('PUT', url, true);
      xhr.send( formData );

    });

  }

}
