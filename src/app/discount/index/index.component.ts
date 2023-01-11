import { Component, OnInit } from '@angular/core';
import { MatCalendarView } from '@angular/material/datepicker';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  testing(item: MatCalendarView) {
    // alert(item)
    alert(item)
  }

}
