import { Component, HostListener, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService } from 'src/app/services/game.service';
import {  trigger,  state,  style,  animate,  transition, stagger} from '@angular/animations';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  animations: [
    trigger('fadeSlideInOut', [
      transition(':enter', [

        // state('*', style({position: 'relative'}) ),

        style({ opacity: 1, transform: 'scale(0.5)' }),
        animate('100ms', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      // transition(':leave', [
      //   style({position: 'absolute', left:this.left+'px'}),
      //   // animate('1000ms', style({ opacity: 1, transform:'translateX(100px)' })),
      //   animate('1000ms', style({ opacity: 1, transform:this.translate }))
      // ]
      // ),
    ]),


    // trigger('slide', [
    //   transition(':leave', [
    //     // state('*', style({position: 'relative'}) ),
    //     style({ position:'absolute' }),
    //     animate('100ms', style({ opacity: 1, transform: 'scale(1)' })),
    //   ]),
    // ]),

]

})
export class BoardComponent implements OnInit {
  translate:string='';
  left:number=0;
  top:number=0;
  values:any[]=[];
  valuesSubscription:Subscription=new Subscription;
  areThereMoves:boolean=true;
  isGameWon:boolean=false;
  movesSubscription:Subscription=new Subscription;
  gameWonSubscription:Subscription=new Subscription;
  constructor(private gameService:GameService) { }

  ngOnInit(): void {
    this.gameService.randomize(1);
    this.gameService.randomize(1);
    this.valuesSubscription = this.gameService.getValues()
      .subscribe({next:(values) => {
        this.values=values;
      }})
    this.movesSubscription=this.gameService.getAvailableMoves()
      .subscribe({next:(availableMove)=>{
        this.areThereMoves=availableMove;
      }})
      this.gameWonSubscription=this.gameService.getWinCondition()
      .subscribe({next:(winCondition)=>{
        this.isGameWon=winCondition;
      }})
  }

  // if(!this.gameService.winCondition || this.gameService.availableMoves){}
  @HostListener("window:keyup", ["$event"])
  keyEvent(event: KeyboardEvent) {
    if(this.gameService.winCondition || !this.gameService.availableMoves){
      return;
    }
    switch (event.keyCode) {
      case 39: //right
        this.gameService.move(true,16,4,4,1);
        this.gameService.merge(15);
        this.gameService.move(true,16,4,4,1);
        this.gameService.randomize(1);
        this.gameService.winCheck();
        this.gameService.movesCheck();
      break;

      case 37: //left
      this.gameService.move(false,16,4,4,1);
      this.gameService.merge(15);
      this.gameService.move(false,16,4,4,1);
      this.gameService.randomize(1);
      this.gameService.winCheck();
      this.gameService.movesCheck();
      break;

      case 38: //up
      this.gameService.move(false,4,1,16,4);
      this.gameService.merge(12);
      this.gameService.move(false,4,1,16,4);
      this.gameService.randomize(1);
      this.gameService.winCheck();
      this.gameService.movesCheck();
      break;

      case 40: //down
      this.gameService.move(true,4,1,16,4);
      this.gameService.merge(12);
      this.gameService.move(true,4,1,16,4);
      this.gameService.randomize(1);
      this.gameService.winCheck();
      this.gameService.movesCheck();
      break;
    }
  }

  initGame(){
    this.gameService.newGame();
  }
}
