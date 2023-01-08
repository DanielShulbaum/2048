import { Injectable  } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  values:any=[null,null,null,null,null,null,null,null,
    null,null,null,null,null,null,null,null];
  values$=new BehaviorSubject<any[]>(this.values);
  winCondition:boolean=false;
  winCondition$=new BehaviorSubject<boolean>(false)
  availableMoves:boolean=true;
  availableMoves$=new BehaviorSubject<boolean>(true)
  score:number=0;
  score$=new BehaviorSubject<number>(this.score);
  change$=new Subject<number>();
  constructor() { }

  randomize(num:number){
    if (this.values.includes(null)){
      do {
        var cell = Math.floor(Math.random() *16 );
      } while (this.values[cell]!==null);// just sign ! doesnt work
        this.values[cell]=2;
    }
  }
  getValues():Observable<any[]>{
    return this.values$;
  }
  getScore():BehaviorSubject<number>{
    return this.score$ as BehaviorSubject<number>;
  }
  getWinCondition():BehaviorSubject<boolean>{
    return this.winCondition$ as BehaviorSubject<boolean>
  }
  getAvailableMoves():BehaviorSubject<boolean>{
    return this.availableMoves$ as BehaviorSubject<boolean>
  }
  getChange():Subject<number>{
    return this.change$ as Subject<number>
  }
  setScore(){
    this.score$.next(this.score);
  }

  move(isRight:boolean,firstLimit:number,firstChange:number,secondLimit:number,secondChange:number){
    for(let i=0; i<firstLimit; i=i+firstChange){//16,4
      let arr=[];
      let start:number;
      let end:number;
      for (let k=0; k<secondLimit ;k=k+secondChange){//4,1
        arr.push(this.values[i+k]);
      }
      let values=arr.filter(num => num);
      start=arr.indexOf(!null)+i*4;
      end=arr.lastIndexOf(null);
      // console.log('start'+start);
      // console.log('end'+end);
      if(values.length!==4){
        let empty=Array(4-values.length).fill(null);
        let newArr=[];
        if(isRight){
          newArr = empty.concat(values);
        }else{
          newArr=values.concat(Array(4-values.length).fill(null))
        }

        for(let f=0; f<4; f++){
          // console.log('index is: ',i+f*4);

          if(firstChange===4){
          this.values[i+f]=newArr[f];
          // this.animateCellMove(i,i)

          }else{
            this.values[i+f*4]=newArr[f];
            // this.animateCellMove(i,i)
          }
        }
      // if(start!==-1){
      //   this.animateCellMove(start,end)
      //   }
      }
    }
  }
  animateCellMove(from:number, to:number){
    const first = document.getElementById(''+from);
    const firstPosition = document.getElementById(''+from)!
      .getBoundingClientRect().top;
    const secondPosition = document.getElementById(''+to)!
      .getBoundingClientRect().top;
    const diff = firstPosition-secondPosition;
    // console.log('diff'+diff);
    // first!.style.position='absolute';
    first!.style.transform='translate('+diff+'px)';
  }
  merge(limit:number){
      let scoreChange:number=0;
      for(let i=0; i<limit; i++){//15,1
        if (limit===15){
          if(this.values[i] === this.values[i+1] && Math.floor(i/4)===Math.floor((i+1)/4 ) && this.values[i]!==null ){
            this.values[i]=this.values[i]+this.values[i];
            this.score = this.score+this.values[i];
            scoreChange=scoreChange+this.values[i];
            this.setScore();
            this.values[i+1]=null;
          }
        }else{
          if(this.values[i] === this.values[i+4] && this.values[i]!==null){
            this.values[i]=this.values[i]+this.values[i];
            this.score = this.score+this.values[i];
            scoreChange=scoreChange+this.values[i];
            this.setScore();
            this.values[i+4]=null;
          }
        }
      }
      this.change$.next(scoreChange);
  }
  movesCheck(){
    this.availableMoves=this.values.includes(null);
    if(!this.availableMoves){
      for(let i=0; i<15; i++){
        if(this.values[i] === this.values[i+1] && Math.floor(i/4)===Math.floor((i+1)/4 )){
          this.availableMoves=true;
          break;
        }
      }
      for(let i=0; i<12; i++){
        if(this.values[i] === this.values[i+4]){
          this.availableMoves=true;
          break;
        }
      }
    }

    if(!this.availableMoves){
      let bestScore =+localStorage.getItem('Record')!;
      if (this.score > bestScore){
        localStorage.setItem('Record', JSON.stringify(this.score))
      }
      this.availableMoves$.next(false);
    }

  }
  winCheck(){
    this.winCondition=this.values.includes('2048');
    if(this.winCondition){
      let bestScore =+localStorage.getItem('Record')!;
      if (this.score > bestScore){
        localStorage.setItem('Record', JSON.stringify(this.score))
      }
      this.winCondition$.next(true);
    }
  }
  newGame(){
    this.values.fill(null);
    this.values$.next(this.values);
    this.score=0;
    this.score$.next(0);
    this.availableMoves = true;
    this.winCondition=false;
    this.availableMoves$.next(true);
    this.winCondition$.next(false);
    this.randomize(1);
    this.randomize(1);
  }

}




