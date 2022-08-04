import { environment } from 'src/environments/environment';
import { Category } from './../../../types/category';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, Subscription } from 'rxjs';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/types/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  id!: number;
  product!: Product
  categoriesList!: Category[];

  deleteProductSubscription!: Subscription;
  updateProductSubscription!: Subscription;

  imgUrl!: string;

  categoriesSubscription!: Subscription;

  imagesPath: string = environment.imagesPath;

  loading: boolean = false;

  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private route: ActivatedRoute,
              private router: Router,
              private alertifyService: AlertifyService
              ) { }

  productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl(0, Validators.required),
    categoryId: new FormControl(0, Validators.required),
    isPopular: new FormControl(false, Validators.required),
    image: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.route.paramMap.pipe(switchMap(param => {
      this.loading = true;
      const id = parseInt(param.get('id')!);
      this.id = id;
      return this.productService.getProductAndCategoriesList(id)

    }))
    .subscribe(productAndCategories => {

      const [product, categories] = productAndCategories

      this.categoriesList = [...categories];

      this.product = {...product}
      this.productForm.patchValue({
        name: this.product.name,
        price: this.product.price,
        categoryId: this.product.categoryId,
        image: this.product.path,
        isPopular: this.product.isPopular

      })
      this.loading = false;
    })

  }

  uploadFile(e: any) {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.imgUrl = reader.result as string;

    }

    reader.readAsDataURL(file);

    this.productForm.patchValue({
      image: file
    })

   }

   formNotValid() {
    return  !this.productForm.valid
   }

   updateProduct() {

     const formData = new FormData();

     const form = this.productForm;

     const name = form.get('name')?.value!;

     const price = form.get('price')?.value!;

     const categoryId = form.get('categoryId')?.value!;

     const image = form.get('image')?.value!;

     const isPopular = form.get('isPopular')?.value!;



     formData.append("id", this.id.toString());

     formData.append("name", name);

     formData.append('price', price.toString());

     formData.append('categoryId', categoryId.toString());

     formData.append('image', image);

     formData.append('isPopular', isPopular.toString());

     this.loading = true;

     console.log("isPopular", isPopular);



     this. updateProductSubscription = this.productService.updateProduct(formData, this.id)
                         .subscribe(product => {
                           this.alertifyService.success("Product updated successfully");
                           this.loading = false;
                           this.router.navigate(['/products']);
                         })
   }


   hasError(key: string) {

     const isEmpty: boolean = this.productForm.get(key)?.value == ""

     return this.productForm.get(key)?.pristine || (isEmpty)
   }

   revmoeProduct(id: number) {
    this.deleteProductSubscription = this.productService.removeProduct(id)
                                      .subscribe(() => {
                                        this.alertifyService.success("product deleted succefully")
                                        this.router.navigate(['products'])
                                      })

   }

  ngOnDestroy(): void {

    if(this.deleteProductSubscription){
      this.deleteProductSubscription.unsubscribe();
    }

    if(this.categoriesSubscription)
    {
      this.categoriesSubscription.unsubscribe();
    }
  }

}
