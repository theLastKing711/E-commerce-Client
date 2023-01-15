import { ChartData } from 'src/types/stats';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-top-selling-products-chart',
  templateUrl: './top-selling-products-chart.component.html',
  styleUrls: ['./top-selling-products-chart.component.scss']
})
export class TopSellingProductsChartComponent  {


  @Input() topSellingProductsData!: ChartData[];

  @ViewChild("TopProductsCardRef") productChartCard!: ElementRef<HTMLElement>;

  view: [number, number] = [700, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';


  ngAfterViewInit(): void {

    setTimeout(() => {
      this.view = [this.productChartCard.nativeElement.offsetWidth, 400]
    },0)


  }

  onResize(e: any) {

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
