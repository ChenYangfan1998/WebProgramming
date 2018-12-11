import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishDiaryDialogComponent } from './publish-diary-dialog.component';

describe('PublishDiaryDialogComponent', () => {
  let component: PublishDiaryDialogComponent;
  let fixture: ComponentFixture<PublishDiaryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishDiaryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishDiaryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
