
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
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    LoadingComponent
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
    LoadingComponent
  ]
})
export class SharedModule { }
