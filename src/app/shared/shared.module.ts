import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { LoadingComponent } from './loading/loading.component';
import { EmptyListComponent } from './empty-list/empty-list.component';
import {MatRippleModule} from '@angular/material/core';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatSortModule } from '@angular/material/sort';
import { TableSearchComponent } from './table-search/table-search.component';

@NgModule({
  declarations: [
    LoadingComponent,
    EmptyListComponent,
    ConfirmationDialogComponent,
    TableSearchComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatPaginatorModule,
    MatCardModule,
    MatSelectModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatRippleModule,
    MatSortModule,
  ],
  exports: [
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatPaginatorModule,
    MatCardModule,
    MatSelectModule,
    RouterModule,
    MatProgressSpinnerModule,
    LoadingComponent,
    MatCheckboxModule,
    MatRippleModule,
    EmptyListComponent,
    ConfirmationDialogComponent,
    MatSortModule,
    TableSearchComponent

  ]
})
export class SharedModule { }
