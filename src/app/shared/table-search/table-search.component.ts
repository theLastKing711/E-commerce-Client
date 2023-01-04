import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, Observable, startWith, Subscription, tap } from 'rxjs';
import { TableSearchService } from 'src/app/table-search.service';

@Component({
  selector: 'app-table-search',
  templateUrl: './table-search.component.html',
  styleUrls: ['./table-search.component.scss']
})
export class TableSearchComponent implements OnInit, OnDestroy {

  @Input() title!: string;

  public searchControl!: FormControl;

  public searchSubscription!: Subscription;

  constructor(private fb: FormBuilder, private tableSearchService: TableSearchService) { }

  ngOnInit(): void {

    this.searchControl = this.fb.control('');

    this.searchSubscription = this.searchControl.valueChanges
                      .pipe(
                        map(x => x == "" ? "-1" : x),
                        distinctUntilChanged(),
                        debounceTime(150),
                      )
                      .subscribe( query =>
                        this.tableSearchService.setQuery(query)
                      )
  }

  ngOnDestroy(): void {

    this.searchSubscription.unsubscribe();
  }


}
