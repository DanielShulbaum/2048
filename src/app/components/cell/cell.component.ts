import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import {  trigger,  state,  style,  animate,  transition} from '@angular/animations';
@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
    animations: [
      // trigger('fadeSlideInOut', [
      //   transition(':enter', [
      //     style({ opacity: 1, transform: 'scale(0.5)' }),
      //     animate('100ms', style({ opacity: 1, transform: 'scale(1)' })),

      //     // style({ opacity: 0, transform: 'translateX(50px)' }),
      //     // animate('500ms', style({ opacity: 1, transform: 'translateX(50px)' })),
      //   ]),
      //   transition(':leave', [
      //     animate('100ms', style({ opacity: 1, transform: 'translateX(50px)' })),
      //   ]),
      // ]),
  ]
})
export class CellComponent implements OnInit, OnDestroy {
  @Input() value!:number|null;
  @Input() id!:number;
  constructor() { }

  ngOnInit(): void {
    console.log(this.id + 'component created');
  }
  ngOnDestroy():void{
    console.log(this.id + 'component destroyed');
  }
}
