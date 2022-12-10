import { EnhancedSelectionModel } from './../../shared/utils/EnhancedSelectionModel';
import { SelectionModel } from '@angular/cdk/collections';
import { AppUser } from 'src/types/appUser';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-app-users-table',
  templateUrl: './app-users-table.component.html',
  styleUrls: ['./app-users-table.component.scss']
})


export class AppUsersTableComponent {

  @Input() userSelection!: EnhancedSelectionModel<AppUser>;
  @Input() appUsersList!: AppUser[];
  @Input() displayedColumns!: string[];
  @Output() appUsersRemoved: EventEmitter<number[]> = new EventEmitter<number[]>();
  @Output() userSelectionFilled: EventEmitter<AppUser[]>  = new EventEmitter<AppUser[]>();
  @Output() userSelectionCleared: EventEmitter<void>  = new EventEmitter<void>();
  @Output() userSelectionItemToggled: EventEmitter<AppUser>  = new EventEmitter<AppUser>();

  isListEmpty(list: AppUser[]): boolean
  {
    return list.length == 0;
  }

  isSelectionsEmpty(): boolean
  {
    return this.userSelection.isSelectionsEmpty();
  }

  toggleSelections(list: AppUser[])  {

    if(this.userSelection.isSelectionsFull(list))
    {
      this.userSelectionCleared.emit();
    }
    else
    {
      this.userSelectionFilled.emit(list);
    }
  }

  private isSelectionsFull(list: AppUser[]): boolean {
    return this.userSelection.isSelectionsFull(list);
  }

  isSelectionsToggeld(list: AppUser[])
  {
    return this.userSelection.isSelectionsToggeld(list);
  }

  toggleSelection(item: AppUser)
  {
    this.userSelectionItemToggled.emit(item);
  }

  isItemChecked(item: AppUser): boolean {
    return this.userSelection.isSelected(item.id);
  }

  isToggleSelectionsIndeterminate(list: AppUser[]): boolean {
    return this.userSelection.isToggleSelectionsIndeterminate(list);
  }

  isSelectionsNotEmpty(): boolean {
    return this.userSelection.isSelectionsEmpty();
  }

  private isSelectionsNotFull(list: AppUser[]): boolean {
    return this.userSelection.isSelectionsFull(list);
  }

  selectionsCount(): number {
    return this.userSelection.selectionsCount();
  }

  removeAppUsers(ids: number[]) {
    this.appUsersRemoved.emit(ids);
  }

}
