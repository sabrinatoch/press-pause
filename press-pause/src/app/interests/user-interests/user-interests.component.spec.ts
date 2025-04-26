import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInterestsComponent } from './user-interests.component';

describe('UserInterestsComponent', () => {
  let component: UserInterestsComponent;
  let fixture: ComponentFixture<UserInterestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserInterestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserInterestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
