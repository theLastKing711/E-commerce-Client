import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { ChartData } from 'src/types/stats';

@Component({
  selector: 'app-sales-bar-chart',
  templateUrl: './sales-bar-chart.component.html',
  styleUrls: ['./sales-bar-chart.component.scss']
})
export class SalesBarChartComponent implements OnInit, AfterViewInit {

  @Input() yearlySalesList!: ChartData[];

  @ViewChild("chartCard") chartCard!: ElementRef<HTMLElement>;

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Month';
  showYAxisLabel = true;
  yAxisLabel = 'Sales';
  timeline = true;

  view: any = [600, 400];

  onResize(e: HTMLElement) {

    // const salesBarChartWidthPercent = this.calculateChartWidth(e.target.innerWidth)


    this.view = [ e.offsetWidth , 400]
  }

  // calculateChartWidth(screenWidth: number): number {

  //   const salesBarChartWidthPercent: number = screenWidth <= 600 ? 100 : 75;

  //   return salesBarChartWidthPercent;

  // }

  constructor() { }

  ngOnInit(): void {
    // const salesBarChartWidthPercent = this.calculateChartWidth(window.innerWidth)

    // this.view = [ (window.innerWidth * salesBarChartWidthPercent) / 100 , 400]
  }


  ngAfterViewInit(): void {


    setTimeout(() => {
      this.view = [this.chartCard.nativeElement.offsetWidth, 400]
    }, 0)


  }

}
