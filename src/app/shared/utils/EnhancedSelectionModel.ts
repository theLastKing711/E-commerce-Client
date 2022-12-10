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

    isSelectionsToggeld<T>(list: T[])
    {
        return this.selected.length == list.length;
    }

    toggleSelection(item: T)
    {
        this.toggle(item.id);
    }

    isSelectionsEmpty(): boolean
    {
        return this.selected.length == 0;
    }

    isSelectionsFull(list: T[]): boolean {
        return this.selected.length == list.length;
    }

    isItemChecked<T extends { id: number }>(selections:  SelectionModel<number>, item: T): boolean {
        return this.isSelected(item.id);
    }

    isToggleSelectionsIndeterminate(list: T[]): boolean {
        return this.isSelectionsNotEmpty() && this.isSelectionsNotFull(list);
    }

    isSelectionsNotEmpty(): boolean {
        return this.selected.length > 0;
    }

    isSelectionsNotFull(list: T[]): boolean {
        return this.selected.length != list.length;
    }

    selectionsCount(): number {
        return this.selected.length;
    }


}
