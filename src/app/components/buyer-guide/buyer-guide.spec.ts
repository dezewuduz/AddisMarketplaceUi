import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerGuide } from './buyer-guide';

describe('BuyerGuide', () => {
  let component: BuyerGuide;
  let fixture: ComponentFixture<BuyerGuide>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyerGuide],
    }).compileComponents();

    fixture = TestBed.createComponent(BuyerGuide);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
