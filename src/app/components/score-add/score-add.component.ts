import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService } from 'src/app/services/game.service';
import {  trigger,  state,  style,  animate,  transition} from '@angular/animations';
@Component({
  selector: 'app-score-add',
  templateUrl: './score-add.component.html',
  styleUrls: ['./score-add.component.scss'],
  animations: [
    trigger('fadeUp', [

      transition(':enter', [
        style({ opacity: 1, transform: 'scale(0.5)' }),
        animate('50ms', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('50ms', style({ opacity: 1, transform:'translateY(-20px)' })),
      ]),
    ]),

]
})
export class ScoreAddComponent implements OnInit {
  change:number=0;
  subscriptionToChange:Subscription=new Subscription;
  show:boolean=false;
  constructor(private gameService:GameService) { }

  ngOnInit(): void {
    this.change=0;
    this.subscriptionToChange=this.gameService.getChange()
      .subscribe({next:(value:number)=>{
        this.change = value;
        this.show = true;
        setTimeout(() => {
          this.show=false;
          this.change=0;
        }, 1500);
      }
      })
  }

}
