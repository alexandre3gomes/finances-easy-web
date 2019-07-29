import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearBalanceComponent } from './year-balance.component';

describe('YearBalanceComponent', () => {
  let component: YearBalanceComponent;
  let fixture: ComponentFixture<YearBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
