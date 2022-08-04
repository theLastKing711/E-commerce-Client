import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/categories',
    pathMatch: 'full'
  },
  {
    path: 'categories',
    loadChildren: () => import('./category/category.module').then(m => m.CategoryModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'products',
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'invoices',
    loadChildren: () => import('./invoice/invoice.module').then(m => m.InvoiceModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'stats',
    loadChildren: () => import('./stats/stats.module').then(m => m.StatsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'authentication',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
