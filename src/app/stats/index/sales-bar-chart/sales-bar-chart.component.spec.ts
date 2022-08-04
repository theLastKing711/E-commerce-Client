import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesBarChartComponent } from './sales-bar-chart.component';

describe('SalesBarChartComponent', () => {
  let component: SalesBarChartComponent;
  let fixture: ComponentFixture<SalesBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesBarChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
