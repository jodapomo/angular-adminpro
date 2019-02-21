import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-increaser',
  templateUrl: './increaser.component.html',
  styles: []
})
export class IncreaserComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input() legend: string = 'Legend';
  @Input() progress: number = 50;

  @Output() valueChange: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onChange( newValue: number ) {

    // const elemtHTML: any = document.getElementsByName('progress')[0];

    if (this.progress >= 100) {

      this.progress = 100;

    } else if (this.progress <= 0) {

      this.progress = 0;

    } else {
      this.progress = newValue;
    }

    // this.value = this.progress;
    this.txtProgress.nativeElement.value = this.progress;

    this.valueChange.emit( this.progress );
  }

  changeValue( value: number ) {

    this.progress = this.progress + value;

    if (this.progress >= 100) {

      this.progress = 100;

    } else if (this.progress <= 0) {

      this.progress = 0;

    }

    this.valueChange.emit( this.progress );

    this.txtProgress.nativeElement.focus();

  }

}
