import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreAddComponent } from './score-add.component';

describe('ScoreAddComponent', () => {
  let component: ScoreAddComponent;
  let fixture: ComponentFixture<ScoreAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoreAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
