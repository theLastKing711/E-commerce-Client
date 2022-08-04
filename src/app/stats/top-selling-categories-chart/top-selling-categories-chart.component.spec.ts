import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSellingCategoriesChartComponent } from './top-selling-categories-chart.component';

describe('TopSellingCategoriesChartComponent', () => {
  let component: TopSellingCategoriesChartComponent;
  let fixture: ComponentFixture<TopSellingCategoriesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopSellingCategoriesChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopSellingCategoriesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
