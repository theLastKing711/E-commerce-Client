import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ChartData } from 'src/types/stats';

@Component({
  selector: 'app-top-selling-categories-chart',
  templateUrl: './top-selling-categories-chart.component.html',
  styleUrls: ['./top-selling-categories-chart.component.scss']
})
export class TopSellingCategoriesChartComponent   {

  @Input() topSellingCategoriesData!: ChartData[];

  @ViewChild("TopCategoriessCardRef") categoryChartCard!: ElementRef<HTMLElement>;

  view: [number, number] = [700, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';


  ngAfterViewInit(): void {
    setTimeout(() => {
      this.view = [this.categoryChartCard.nativeElement.offsetWidth, 400]
    },0)

  }

  onResize(e: HTMLElement) {
    this.view = [ e.offsetWidth , 400]
  }


  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
