import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoShopComponent } from './photo-shop.component';

describe('PhotoShopComponent', () => {
  let component: PhotoShopComponent;
  let fixture: ComponentFixture<PhotoShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
