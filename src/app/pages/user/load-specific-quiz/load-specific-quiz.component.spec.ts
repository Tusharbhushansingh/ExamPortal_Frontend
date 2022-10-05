import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadSpecificQuizComponent } from './load-specific-quiz.component';

describe('LoadSpecificQuizComponent', () => {
  let component: LoadSpecificQuizComponent;
  let fixture: ComponentFixture<LoadSpecificQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadSpecificQuizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadSpecificQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
