import { RoleGuard } from './guards/role.guard';
import { Role } from 'src/types/auth';
import { AppUserModule } from './app-user/app-user.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


const AdminRole: Role[] = [Role.Admin]

const AdminAndSalesManagerRoles: Role[] = [Role.Admin, Role.SalesManger]


const routes: Routes = [
  {
    path: '',
    redirectTo: '/categories',
    pathMatch: 'full'
  },
  {
    path: 'users',
    loadChildren: () => import('./app-user/app-user.module').then(m => m.AppUserModule),
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: AdminRole
    }
  },
  {
    path: 'categories',
    loadChildren: () => import('./category/category.module').then(m => m.CategoryModule),
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: AdminAndSalesManagerRoles
    }
  },
  {
    path: 'products',
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: AdminAndSalesManagerRoles
    }
  },
  {
    path: 'invoices',
    loadChildren: () => import('./invoice/invoice.module').then(m => m.InvoiceModule),
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: AdminAndSalesManagerRoles
    }
  },
  {
    path: 'stats',
    loadChildren: () => import('./stats/stats.module').then(m => m.StatsModule),
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: AdminAndSalesManagerRoles
    }
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
