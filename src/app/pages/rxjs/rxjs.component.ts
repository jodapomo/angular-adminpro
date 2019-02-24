import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    this.subscription = this.returnObservable()
    .subscribe(
      number => console.log('Subs', number),
      err => console.error('Obs Error', err),
      () => console.log('El observador terminó!')
    );

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  returnObservable(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {

      let count = 0;

      const interval = setInterval( () => {

        count++;

        const salida = {
          value: count
        };

        observer.next( salida );

        // if ( count === 3 ) {
        //   clearInterval( interval);
        //   observer.complete();
        // }

        // if ( count === 2 ) {
        //   // clearInterval( interval);
        //   observer.error('Error');
        // }

      }, 1000);

    })
    .pipe(
      map( res => res.value ),
      filter( (value, index) => {

        if ( (value % 2) === 1 ) {
          // odd
          return true;
        } else {
          // pair
          return false;
        }

      })
    );
  }

}
