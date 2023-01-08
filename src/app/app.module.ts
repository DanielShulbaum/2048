import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScoreComponent } from './components/score/score.component';
import { RecordComponent } from './components/record/record.component';
import { NewGameComponent } from './components/new-game/new-game.component';
import { TitleComponent } from './components/title/title.component';
import { SubtitleComponent } from './components/subtitle/subtitle.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { BoardComponent } from './components/board/board.component';
import { CellComponent } from './components/cell/cell.component';
import { ScoreAddComponent } from './components/score-add/score-add.component';

@NgModule({
  declarations: [
    AppComponent,
    ScoreComponent,
    RecordComponent,
    NewGameComponent,
    TitleComponent,
    SubtitleComponent,
    FeedbackComponent,
    BoardComponent,
    CellComponent,
    ScoreAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
