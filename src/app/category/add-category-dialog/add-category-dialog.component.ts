import { AlertifyService } from './../../services/alertify.service';
import { DialogService } from './../../services/dialog.service';
import { Category, AddCategory } from './../../../types/category';
import { CategoryService } from './../../services/category.service';
import { IndexComponent } from './../index/index.component';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-category-dialog',
  templateUrl: './add-category-dialog.component.html',
  styleUrls: ['./add-category-dialog.component.scss']
})
export class AddCategoryDialogComponent implements OnInit {

  constructor(private categoryService: CategoryService
     ,public dialogRef: MatDialogRef<IndexComponent>,
     public dialogService: DialogService,
     private alertifyService: AlertifyService) {}

  categoryForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
  }

  addCategory() {

    const newCategory : AddCategory = {
      id: 0,
      name: this.categoryForm.value.name!,
    }

    this.categoryService.addCategory(newCategory)
                        .subscribe(category => {
                          this.dialogService.subject.next(category);
                          this.alertifyService.success("Category added successfully")
                          this.dialogRef.close();
                        })

  }


  hasError(key: string) {

    const isEmpty: boolean = this.categoryForm.get(key)?.value == ""

    return this.categoryForm.get(key)?.pristine || (isEmpty)
  }

}
