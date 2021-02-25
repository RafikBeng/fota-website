import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CautionHeaderComponent } from './caution-header.component';

describe('CautionHeaderComponent', () => {
  let component: CautionHeaderComponent;
  let fixture: ComponentFixture<CautionHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CautionHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CautionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
