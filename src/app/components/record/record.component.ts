import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {
  finalScore:number=0;
  bestScore:number=0;
  constructor() { }

  ngOnInit(): void {
    this.bestScore =+localStorage.getItem('Record')!;
  }

}
