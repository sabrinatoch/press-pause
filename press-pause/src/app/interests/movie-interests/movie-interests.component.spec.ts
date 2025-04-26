import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieInterestsComponent } from './movie-interests.component';

describe('MovieInterestsComponent', () => {
  let component: MovieInterestsComponent;
  let fixture: ComponentFixture<MovieInterestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieInterestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieInterestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
