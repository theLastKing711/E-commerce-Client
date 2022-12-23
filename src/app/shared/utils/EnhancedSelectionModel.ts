import { SelectionModel } from '@angular/cdk/collections';


export class EnhancedSelectionModel<T extends {id : number}> extends SelectionModel<number> {

    constructor(_multiple?: boolean, initiallySelectedValues?: number[], _emitChanges?: boolean) {
        super(_multiple, initiallySelectedValues, _emitChanges);
    }

    initSelections(list: EnhancedSelectionModel<T>): EnhancedSelectionModel<T> {

        const selectedItems = [...this.selected];

        const newSelectedItems = new EnhancedSelectionModel<T>(true, selectedItems);

        return newSelectedItems;
    }

    clearSelections() {
        this.clear();
        this.initSelections(this);
    }

    fillSelections(mappedList: T[]) {

        const usersId = mappedList.map(x => x.id);
        this.select(...usersId)
        this.initSelections(this);

    }

    isSelectionsToggeld(list: T[])
    {
        return this.isSelectionsFull(list) && (! this.isListEmpty(list))
    }

    isSelectionsFull(list: T[]): boolean {
        return this.selected.length == list.length;
    }


    isListEmpty(list: T[]): boolean {
        console.log("list", list.length == 0)
        return list.length == 0;
    }

    toggleSelection(item: T)
    {
        this.toggle(item.id);
    }

    isSelectionsEmpty(): boolean
    {
        return this.selected.length == 0;
    }

    isItemChecked<T extends { id: number }>(selections:  SelectionModel<number>, item: T): boolean {
        return this.isSelected(item.id);
    }


    isToggleSelectionsIndeterminate(list: T[]): boolean {
        return ! this.isSelectionsEmpty() &&  ! this.isSelectionsFull(list) &&  !(this.isListEmpty(list));
    }

    selectionsCount(): number {
        return this.selected.length;
    }


}
