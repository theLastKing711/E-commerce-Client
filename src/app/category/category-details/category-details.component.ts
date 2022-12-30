import { AlertifyService } from './../../services/alertify.service';
import { Category } from './../../../types/category';
import { switchMap } from 'rxjs';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddCategory } from 'src/types/category';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {

  id!: number;
  category!: Category

  loading: boolean = false;

  constructor(private categoryService: CategoryService,
              private route: ActivatedRoute,
              private alertifyService: AlertifyService
              ) { }

  categoryForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  ngOnInit(): void {

    this.route.paramMap.pipe(switchMap(param => {

      this.loading = true;

      const id = parseInt(param.get('id')!);
      this.id = id;
      return this.categoryService.getCategoryById(id)

    }))
    .subscribe(category => {
      this.category = {...category}
      this.categoryForm.get('name')?.setValue(category.name)

      this.loading = false;
    })

  }

  udpateCategory() {

    const updatedCategory : AddCategory = {
      id: this.id,
      name: this.categoryForm.value.name!,
    }

    const updateCategoryFormData: FormData = new FormData();

    updateCategoryFormData.append("id", updatedCategory.id.toString())
    updateCategoryFormData.append("name", updatedCategory.name)

    this.categoryService.updateCategory(updateCategoryFormData, this.id)
                        .subscribe(category => {
                          this.category = {...category}
                          this.alertifyService.success("Category updated successfully")
                        })

  }


  hasError() {

    const isEmpty: boolean = this.categoryForm.get('name')?.value == ""


    return isEmpty;
  }

}
