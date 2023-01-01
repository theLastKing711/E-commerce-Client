import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteConfirmationDialogService {

  constructor(private dialog: MatDialog) {}


  openDeleteConfirmationDialog(enterAnimationDuration: string, exitAnimationDuration: string, data: any): Observable<any> {

    const confirmationDialogRef = this.dialog.open(ConfirmationDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: data
    })

    return confirmationDialogRef.afterClosed();

  }

}
