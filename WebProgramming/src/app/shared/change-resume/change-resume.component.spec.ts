import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeResumeComponent } from './change-resume.component';

describe('ChangeResumeComponent', () => {
  let component: ChangeResumeComponent;
  let fixture: ComponentFixture<ChangeResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
