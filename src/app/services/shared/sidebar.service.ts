import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      title: 'Main',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Dashboard', url: '/dashboard'},
        { title: 'Progress Bars', url: '/progress'},
        { title: 'Graphics', url: '/graphics1'},
        { title: 'Promises', url: '/promises'},
        { title: 'Rxjs', url: '/rxjs'},
      ]
    }
  ];

  constructor() { }

}
