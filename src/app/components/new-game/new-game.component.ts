import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent implements OnInit {

  constructor(private gameService:GameService) { }

  ngOnInit(): void {
  }

  initNewGame(){
    this.gameService.newGame();
  }
}
