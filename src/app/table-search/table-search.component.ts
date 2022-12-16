import { TableSearchService } from './../table-search.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-table-search',
  templateUrl: './table-search.component.html',
  styleUrls: ['./table-search.component.scss']
})
export class TableSearchComponent implements OnInit {

  public searchControl!: FormControl;

  constructor(private fb: FormBuilder, private tableSearchService: TableSearchService) { }

  ngOnInit(): void {

    this.searchControl = this.fb.control('');

    this.searchControl.valueChanges
                      .pipe(
                        map(x => x == "" ? "-1" : x),
                        distinctUntilChanged(),
                        debounceTime(150),
                        startWith('-1')
                      )
                      .subscribe( query =>
                        this.tableSearchService.setQuery(query)
                      )
  }

}
