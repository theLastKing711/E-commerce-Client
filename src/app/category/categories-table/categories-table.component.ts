import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/types/category';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.scss']
})
export class CategoriesTableComponent implements OnInit {

  @Input() categoriesList!: Category[];
  @Input() columnNames!: string[];
  @Output() categoryRemoved: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }


  removeCategory(id: number) {
    this.categoryRemoved.emit(id);
  }

}
