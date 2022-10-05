import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCatorgiesComponent } from './view-catorgies.component';

describe('ViewCatorgiesComponent', () => {
  let component: ViewCatorgiesComponent;
  let fixture: ComponentFixture<ViewCatorgiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCatorgiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCatorgiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
