import { Component, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {
  score!:number;
  scoreSubscription:Subscription = new Subscription;
  constructor(public gameService:GameService) { }

  ngOnInit(): void {
    this.scoreSubscription = this.gameService.getScore()
      .pipe(delay(0))
      .subscribe({next:(score) => {
        this.score=score;
      }})
  }

}
