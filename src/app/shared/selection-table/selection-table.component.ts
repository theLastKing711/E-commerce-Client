import { Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, ViewChild } from '@angular/core';
import { MatColumnDef, MatHeaderRowDef, MatNoDataRow, MatRowDef, MatTable } from '@angular/material/table';
import { EnhancedSelectionModel } from 'src/app/shared/utils/EnhancedSelectionModel';


@Component({
  selector: 'app-selection-table',
  templateUrl: './selection-table.component.html',
  styleUrls: ['./selection-table.component.scss']
})
export class SelectionTableComponent<T extends {id: number}> {

  @ViewChild(MatTable) table!: MatTable<T>;

  @Input() selectionList!: EnhancedSelectionModel<T>;
  @Input() tableList!: T[];
  @Input() displayedColumns!: string[];
  @Output() appUsersRemoved: EventEmitter<number[]> = new EventEmitter<number[]>();
  @Output() userSelectionFilled: EventEmitter<T[]>  = new EventEmitter<T[]>();
  @Output() userSelectionCleared: EventEmitter<void>  = new EventEmitter<void>();
  @Output() userSelectionItemToggled: EventEmitter<T>  = new EventEmitter<T>();

  @ContentChildren(MatHeaderRowDef) headerRowDefs!: QueryList<MatHeaderRowDef>;
  @ContentChildren(MatRowDef) rowDefs!: QueryList<MatRowDef<T>>;
  @ContentChildren(MatColumnDef) columnDefs!: QueryList<MatColumnDef>;


  ngAfterViewInit(): void {

    console.log("type of this", typeof this)

    this.columnDefs.forEach(columnDef => this.table.addColumnDef(columnDef));
    this.rowDefs.forEach(rowDef => this.table.addRowDef(rowDef));
    this.headerRowDefs.forEach(headerRowDef => this.table.addHeaderRowDef(headerRowDef));
  }

  get getSelectioHeaderSpacerWidth() {
    return this.displayedColumns.length - 2;
  }

  isListEmpty(list: T[]): boolean
  {
    console.log("llist", list)
    return list.length == 0;
  }

  isSelectionsEmpty(): boolean
  {
    return this.selectionList.isSelectionsEmpty();
  }

  toggleSelections(list: T[])  {

    if(this.selectionList.isSelectionsFull(list))
    {
      this.userSelectionCleared.emit();
    }
    else
    {
      this.userSelectionFilled.emit(list);
    }
  }

  private isSelectionsFull(list: T[]): boolean {
    return this.selectionList.isSelectionsFull(list);
  }

  isSelectionsToggeld(list: T[])
  {
    return this.selectionList.isSelectionsToggeld(list);
  }

  toggleSelection(item: T)
  {
    this.userSelectionItemToggled.emit(item);
  }

  isItemChecked(item: T): boolean {
    return this.selectionList.isSelected(item.id);
  }

  isToggleSelectionsIndeterminate(list: T[]): boolean {
    return this.selectionList.isToggleSelectionsIndeterminate(list);
  }

  selectionsCount(): number {
    return this.selectionList.selectionsCount();
  }

  removeAppUsers(ids: number[]) {
    this.appUsersRemoved.emit(ids);
  }

  trackById(index: number, item: T) {
    return item.id
  }

}
