import { AddDiscountDialogComponent } from './../add-discount-dialog/add-discount-dialog.component';
import { TableSearchService } from 'src/app/table-search.service';
import { DeleteConfirmationDialogService } from './../../shared/delete-confirmation-dialog.service';
import { SubSink } from 'subsink';
import { PaginationService } from './../../services/pagination.service';
import { AlertifyService } from './../../services/alertify.service';
import { DialogService } from './../../services/dialog.service';
import { Discount } from '../../../types/discount';
import { DiscountService } from './../../services/discount.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { switchMap, Subject, Observable, filter, pipe, tap, UnaryFunction, startWith, BehaviorSubject, withLatestFrom, skip } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { EnhancedSelectionModel } from 'src/app/shared/utils/EnhancedSelectionModel';
import { Sort } from '@angular/material/sort';
import { SortHeaderService } from 'src/app/shared/sort-header.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [PaginationService,SortHeaderService, TableSearchService]
})
export class IndexComponent implements OnInit, OnDestroy {

  usersSelectionModel: EnhancedSelectionModel<Discount> = new EnhancedSelectionModel<Discount>(true);

  subs: SubSink = new SubSink();

  categoriesList$!: Observable<Discount[]>;
  pageNumber$: Observable<number>;
  pageSize$: Observable<number>;
  totalCount$!: Observable<number>;
  delayedInitializedSearch$!: Observable<string>;

  loading: boolean = false;
  displayedColumns: string[] = [
    'selection', 'id', 'value', 'startDate', 'endDate', 'createdAt', 'details'
  ];

  removeDiscounts: Subject<number[]> = new Subject<number[]>();
  removeDiscounts$: Observable<number[]> = this.removeDiscounts.asObservable();

  openAddDisccountDialog: Subject<void> = new Subject<void>();
  openAddDisccountDialog$ = this.openAddDisccountDialog.asObservable();

  sortHeader$!: Observable<Sort>;

  constructor(
      private discountService: DiscountService,
      public dialog: MatDialog,
      private deleteConfirmationService: DeleteConfirmationDialogService,
      private dialogService: DialogService,
      private alertifyService: AlertifyService,
      private paginationService: PaginationService,
      private searchTableService: TableSearchService,
      private sortHeaderService: SortHeaderService,
    ) {
      this.pageNumber$= this.paginationService.pageNumber$;
      this.pageSize$ = this.paginationService.pageSize$;
      this.totalCount$ = this.paginationService.totalCount$;

      this.categoriesList$ = this.discountService.discounts$;
      this.sortHeader$ = this.sortHeaderService.sortHeader$;

      this.delayedInitializedSearch$ = this.searchTableService.query$;

  }

  ngOnInit(): void {

    this.initPageNumberSubscription();
    this.InitPageNumberDependentsSubsriptions();
    this.initDiscountRemovedSubscription();
    this.initDiscountAddedSubsciption();

  }

  initPageNumberSubscription(): void {

    this.subs.sink = this.pageNumber$
                          .pipe(
                            this.pageNumberDependentsLatestValues(),
                            switchMap(
                              ([pageNumber, query, pageSize, sort]) =>
                              {
                                this.loading = true;
                                const pageIndex = pageNumber;

                                return this.discountService.getDiscounts(pageIndex, pageSize, query, sort)
                              }
                            ),
                          )
                          .subscribe(
                          {
                            next: (paginatedDiscounts) => {
                              this.discountService.setdiscounts([...paginatedDiscounts.data])
                              this.paginationService.setTotalCount(paginatedDiscounts.totalCount)
                              this.clearSelections()

                              this.loading = false;
                            },
                             error: () => {
                              this.loading = false;
                            },
                          }
                          );

  }



  pageNumberDependentsLatestValues(): UnaryFunction<Observable<number>, Observable<[number,string, number, Sort]>> {

    return pipe(
              withLatestFrom(
                this.delayedInitializedSearch$.pipe(startWith("-1")),
                this.pageSize$,
                this.sortHeader$,
            ))

  }


  InitPageNumberDependentsSubsriptions(): void  {

    this.InitSearchInputChangeSubscription();
    this.InitSortHeaderChangedSubscription();

  }

  InitSearchInputChangeSubscription(): void {

    this.subs.sink = this.delayedInitializedSearch$
                         .pipe(tap(x => console.log("users 1", x)))
                         .subscribe(_ => this.paginationService.setPageNumber(1));

  }

  InitSortHeaderChangedSubscription(): void {

    this.subs.sink = this.sortHeader$
                         .pipe(skip(1))
                         .subscribe(_ => this.paginationService.setPageNumber(1))

  }


  initDiscountAddedSubsciption(): void {
    this.subs.sink = this.dialogService.addUser$
                                       .pipe(
                                        withLatestFrom(this.pageNumber$, this.pageSize$, this.delayedInitializedSearch$, this.sortHeader$),
                                        switchMap(
                                          ([discountAdded, pageNumber, pageSize, query, sort]) => this.discountService.getDiscounts(pageNumber, pageSize, query, sort)
                                        )
                                      )
                                      .subscribe(
                                        {
                                          next: (paginatedDiscounts) => {
                                            this.alertifyService.success("Discount added successfully")
                                            this.discountService.setdiscounts([...paginatedDiscounts.data])
                                            this.paginationService.setTotalCount(paginatedDiscounts.totalCount)
                                            this.clearSelections()

                                            this.loading = false;
                                          },
                                          error: () => {
                                            this.loading = false;
                                          }
                                        }
                                      )
  }

  initDiscountRemovedSubscription(): void {

    this.subs.sink = this.removeDiscounts$.pipe(
      switchMap((ids) => this.deleteUserDialogClosed("200", "200", "do you want to delete the selected users")
      .pipe(
        filter((isFormSubmitted: boolean) => isFormSubmitted == true),
        switchMap(() => this.discountService.removeDiscounts(ids)),
      )
     )
    )
    .subscribe(() => {
      this.alertifyService.success("discount removed successfully")
      this.paginationService.setPageNumberAfterDelete()
    })

  }


  sortChanged(sort: Sort) {
    this.sortHeaderService.setSortHeader(sort);
  }

  openAddDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddDiscountDialogComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    })
    .afterClosed()
    .pipe(
      filter(isSubmitted => isSubmitted == true)
    )
    .subscribe(res => {
      this.paginationService.setPageNumber(1);
    })

  }

  deleteUserDialogClosed(enterAnimationDuration: string, exitAnimationDuration: string, data: any): Observable<any> {

    return this.deleteConfirmationService
               .openDeleteConfirmationDialog(
                  enterAnimationDuration,
                  exitAnimationDuration,
                  data
               )

  }

  changePage(e: PageEvent) {

    const nextPage = e.pageIndex + 1;

    this.paginationService.setPageNumber(nextPage)
  }

  clearSelections(): void {
    this.usersSelectionModel.clearSelections();
  }

  fillSelections(list: Discount[]) {

    this.usersSelectionModel.fillSelections(list);

  }

  toggleSelection(item: Discount)
  {
    this.usersSelectionModel.toggleSelection(item);
    this.usersSelectionModel = this.usersSelectionModel.initSelections(this.usersSelectionModel);
  }

  initSelections(list: Discount[]) {

    this.usersSelectionModel = this.usersSelectionModel.initSelections(this.usersSelectionModel);
  }

  ngOnDestroy(): void {

    this.subs.unsubscribe();
  }


}
