import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicInterestsComponent } from './music-interests.component';

describe('MusicInterestsComponent', () => {
  let component: MusicInterestsComponent;
  let fixture: ComponentFixture<MusicInterestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusicInterestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicInterestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
