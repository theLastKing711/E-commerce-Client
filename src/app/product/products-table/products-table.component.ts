import { environment } from 'src/environments/environment';
import { Product } from './../../../types/product';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit {

  imagesPath: string = environment.imagesPath;

  @Input() productsList!: Product[];
  @Input() columnNames!: string[];
  @Output() productRemoved: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }


  removeProduct(id: number) {
    this.productRemoved.emit(id);
  }

}
